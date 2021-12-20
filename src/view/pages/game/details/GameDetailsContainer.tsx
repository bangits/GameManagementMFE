import { gameApi } from '@/adapter/redux/api';
import { GameStatusesEnum } from '@/domain/models';
import { showGameActivateDialog, showGameInActivateDialog } from '@/view/dialogs';
import { GameActionsViewModel } from '@/view/models';
import { gameLaunchService } from '@/view/services';
import { useActionWithDialog, useTranslation } from '@atom/common';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import GameDetails from './GameDetails';

const GameDetailsContainer = () => {
  const params = useParams<{ gameId: string }>();

  const { data, isFetching, originalArgs } = gameApi.useGetGameByIdQuery(+params.gameId);

  const t = useTranslation();

  const dispatch = useDispatch();

  const [changeGameStatus] = gameApi.useChangeGameStatusMutation();

  const { openDialogFn: onActivateButtonClick } = useActionWithDialog<GameActionsViewModel>({
    dialogFn: showGameActivateDialog,
    actionFn: (gameIds) =>
      changeGameStatus({
        gameIds,
        statusId: GameStatusesEnum.ACTIVE,
        lastUpdatedByUserId: 2,
        lastUpdatedByUserEmail: 'test@gmail․com'
      }).unwrap(),
    isFetching,
    t,
    refetch: () => {
      dispatch(
        gameApi.util.updateQueryData('getGameById', originalArgs, (draft) => {
          Object.assign(draft, {
            statusId: GameStatusesEnum.ACTIVE
          });
        })
      );
    },
    getColumnId: (column) => column.gameId
  });

  const { openDialogFn: onInActivateButtonClick } = useActionWithDialog<GameActionsViewModel>({
    dialogFn: showGameInActivateDialog,
    actionFn: (gameIds) =>
      changeGameStatus({
        gameIds,
        statusId: GameStatusesEnum.INACTIVE,
        lastUpdatedByUserId: 2,
        lastUpdatedByUserEmail: 'test@gmail․com'
      }).unwrap(),
    isFetching,
    t,
    refetch: () => {
      dispatch(
        gameApi.util.updateQueryData('getGameById', originalArgs, (draft) => {
          Object.assign(draft, {
            statusId: GameStatusesEnum.INACTIVE
          });
        })
      );
    },
    getColumnId: (column) => column.gameId
  });

  const createGameLauncher = useCallback(
    (isDemo: boolean) => () => {
      gameLaunchService.publish({
        gameId: data.externalId,
        gameLaunchUrl: isDemo ? data.providerAbsoluteDemoUrl : data.providerAbsoluteUrl,
        providerId: data.providerId
      });
    },
    [data]
  );

  if (!data) return null;

  return (
    <GameDetails
      data={data}
      onPlayButtonClick={createGameLauncher(false)}
      onDemoButtonClick={createGameLauncher(true)}
      onActivateButtonClick={() =>
        onActivateButtonClick({
          gameId: data.gameId,
          name: data.gameName
        })
      }
      onInActivateButtonClick={() =>
        onInActivateButtonClick({
          gameId: data.gameId,
          name: data.gameName
        })
      }
      shouldShowActivateButton={data.statusId === GameStatusesEnum.INACTIVE}
      shouldShowInActivateButton={data.statusId === GameStatusesEnum.ACTIVE}
    />
  );
};

export default GameDetailsContainer;
