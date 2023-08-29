/* eslint-disable promise/catch-or-return */
import { gameApi } from '@/adapter/redux/api';
import { gameLaunchService } from '@/view/services';
import { BannerUploader, useTranslation } from '@atom/common';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import GameDetails from './GameDetails';
import { gameImagesConfig } from '@/view/configs';

const GameDetailsContainer = () => {
  const params = useParams<{ gameId: string }>();
  const t = useTranslation();

  const { data, isFetching, refetch, originalArgs } = gameApi.useGetGameByIdQuery(+params.gameId);

  const dispatch = useDispatch();

  const [updateGameImages, { isLoading }] = gameApi.useUpdateImagesMutation();

  const createGameLauncher = useCallback(
    (isDemo: boolean) => () => {
      gameLaunchService.publish({
        gameId: data.externalId,
        gameExternalId: data.gameId.toString(),
        gameLaunchUrl: isDemo ? data.providerAbsoluteDemoUrl : data.providerAbsoluteUrl,
        providerId: data.providerId,
        isDemo,
        providerName: data.providerName,
        gameBackground: data.backGroundImage
      });
    },
    [data]
  );

  const onGameBackgroundChange = useCallback(
    (imageSrc: string) => {
      updateGameImages({
        backGroundImage: imageSrc,
        gameId: data.gameId,
        icon: data.icon
      }).then(() => {
        dispatch(
          gameApi.util.updateQueryData('getGameById', originalArgs, (draft) => {
            Object.assign(draft, {
              backGroundImage: imageSrc
            });
          })
        );
      });
    },
    [data, originalArgs]
  );

  const onGameMainImageChange = useCallback(
    (imageSrc: string) => {
      updateGameImages({
        backGroundImage: data.backGroundImage,
        gameId: data.gameId,
        icon: imageSrc
      })
        .unwrap()
        .then(() => {
          dispatch(
            gameApi.util.updateQueryData('getGameById', originalArgs, (draft) => {
              Object.assign(draft, {
                icon: imageSrc
              });
            })
          );
        });
    },
    [data, originalArgs]
  );

  if (!data) return null;

  return (
    <>
      <BannerUploader
        minCropBoxWidth={gameImagesConfig.MIN_BACKGROUND_WIDTH}
        minCropBoxHeight={gameImagesConfig.MIN_BACKGROUND_HEIGHT}
        title={t.get('gameBackground')}
        onChange={onGameBackgroundChange}
        initialImage={data.backGroundImage}
        aspectRatio={2 / 1}>
        {(openBackgroundImageUploader) => (
          <BannerUploader
            minCropBoxWidth={gameImagesConfig.MIN_GAME_IMAGE_WIDTH}
            minCropBoxHeight={gameImagesConfig.MIN_GAME_IMAGE_HEIGHT}
            title={t.get('gameLogo')}
            onChange={onGameMainImageChange}
            initialImage={data.icon}
            aspectRatio={4 / 3}>
            {(openMainImageUploader) => (
              <GameDetails
                data={data}
                isFetching={isFetching}
                refetch={refetch}
                originalArgs={originalArgs}
                onPlayButtonClick={createGameLauncher(false)}
                onDemoButtonClick={createGameLauncher(true)}
                onGameBackgroundChange={openBackgroundImageUploader}
                onGameMainImageChange={openMainImageUploader}
              />
            )}
          </BannerUploader>
        )}
      </BannerUploader>
    </>
  );
};

export default GameDetailsContainer;
