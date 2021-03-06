import { GameGeneralInformationContainer } from '@/view';
import { gameImagesConfig, gameStatusesConfig } from '@/view/configs';
import { GamesDetailsViewModel } from '@/view/models';
import { BannerUploader, convertDate, historyService, useTranslation } from '@atom/common';
import {
  GameDetails as GameDetailsPage,
  GameDetailsProps as GameDetailsPageProps,
  PageWrapper
} from '@atom/design-system';
import { FC, useMemo } from 'react';

export interface GameDetailsProps {
  data: GamesDetailsViewModel;
  // actions
  shouldShowActivateButton: boolean;
  shouldShowInActivateButton: boolean;
  onInActivateButtonClick: () => void;
  onActivateButtonClick: () => void;
  onPlayButtonClick: () => void;
  onDemoButtonClick: () => void;
  onGameBackgroundChange: (image: string) => void;
  onGameMainImageChange: (image: string) => void;
}

const GameDetails: FC<GameDetailsProps> = ({
  data,
  shouldShowActivateButton,
  shouldShowInActivateButton,
  onActivateButtonClick,
  onInActivateButtonClick,
  onPlayButtonClick,
  onDemoButtonClick,
  onGameBackgroundChange,
  onGameMainImageChange
}) => {
  const t = useTranslation();

  const breadCrumbs = useMemo(
    () => [
      {
        label: t.get('gameManagement'),
        isRedirect: true,
        componentProps: {
          onClick: () => historyService.redirectToURL('/game')
        }
      },
      {
        label: t.get('gameDetails')
      }
    ],
    [t]
  );

  const statusInfo = useMemo(
    () => ({
      statusLabel: t.get(gameStatusesConfig[data.statusId].translationKey),
      variant: gameStatusesConfig[data.statusId].variant,
      actions: [
        ...(shouldShowActivateButton
          ? [
              {
                iconName: 'CheckButtonIcon' as const,
                onClick: onActivateButtonClick,
                tooltipText: t.get('activate')
              }
            ]
          : []),
        ...(shouldShowInActivateButton
          ? [
              {
                iconName: 'BlockButtonIcon' as const,
                onClick: onInActivateButtonClick,
                tooltipText: t.get('inActivate')
              }
            ]
          : [])
      ]
    }),
    [shouldShowInActivateButton, onActivateButtonClick, shouldShowActivateButton, onInActivateButtonClick, t]
  );

  const translations = useMemo<GameDetailsPageProps['translations']>(
    () => ({
      createdBy: t.get('createdBy'),
      creationDate: t.get('creationDate'),
      status: t.get('status'),
      lastUpdateDate: t.get('lastUpdateDate'),
      lastUpdateBy: t.get('lastUpdateBy'),
      generalInformation: t.get('generalInformation'),
      assets: t.get('assets'),
      playButton: t.get('play'),
      playDemoButton: t.get('playDemo')
    }),
    [t]
  );

  const buttons = useMemo<GameDetailsPageProps['buttons']>(
    () => ({
      playButtonProps: {
        onClick: onPlayButtonClick
      },
      playDemoButtonProps: {
        onClick: onDemoButtonClick,
        disabled: !data.hasDemo
      }
    }),
    [data]
  );

  return (
    <PageWrapper>
      <BannerUploader
        minCropBoxWidth={gameImagesConfig.MIN_BACKGROUND_WIDTH}
        minCropBoxHeight={gameImagesConfig.MIN_BACKGROUND_HEIGHT}
        title={t.get('gameBackground')}
        onChange={onGameBackgroundChange}
        initialImage={data.backGroundImage}
        aspectRatio={2 / 1}>
        {(openBackgroundImageUploader) => (
          <>
            <BannerUploader
              minCropBoxWidth={gameImagesConfig.MIN_GAME_IMAGE_WIDTH}
              minCropBoxHeight={gameImagesConfig.MIN_GAME_IMAGE_HEIGHT}
              title={t.get('gameLogo')}
              onChange={onGameMainImageChange}
              initialImage={data.icon}
              aspectRatio={1}>
              {(openMainImageUploader) => (
                <GameDetailsPage
                  gameName={data.gameName}
                  backgroundImgUrl={data.backGroundImage}
                  onMainImgClick={openMainImageUploader}
                  onBackgroundImgClick={openBackgroundImageUploader}
                  mainImgUrl={data.icon}
                  gameId={`${t.get('id')} ${data.gameId ? data.gameId : t.get('emptyValue')}`}
                  breadCrumbs={breadCrumbs}
                  noDataText={t.get('emptyValue')}
                  statusInfo={statusInfo}
                  creationDate={convertDate(data.creationDate)}
                  createdBy={data.createdByUserEmail}
                  lastUpdateDate={convertDate(data.lastUpdatedDate)}
                  lastUpdateBy={data.lastUpdatedByUserEmail}
                  generalInformationContext={<GameGeneralInformationContainer data={data} />}
                  buttons={buttons}
                  translations={translations}
                />
              )}
            </BannerUploader>
          </>
        )}
      </BannerUploader>
    </PageWrapper>
  );
};

export default GameDetails;
