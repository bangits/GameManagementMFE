import { gameApi } from '@/adapter/redux/api';
import { GameActionsViewModel, GamesDetailsViewModel } from '@/atom-game-management';
import { GameStatusesEnum } from '@/domain';
import { GameDetailsSidebar, GameGeneralInformationContainer } from '@/view';
import { gameStatusesConfig } from '@/view/configs';
import { showGameActivateDialog, showGameInActivateDialog } from '@/view/dialogs';
import { convertDate, redirectToURL, useActionWithDialog, useTranslation } from '@atom/common';
import { DetailsPage, ItemDetails } from '@atom/design-system';
import { FC, useMemo } from 'react';
import { useDispatch } from 'react-redux';

export interface GameDetailsProps {
  data: GamesDetailsViewModel;
  isFetching: boolean;
  originalArgs: any;
  refetch: () => void;
  onPlayButtonClick: () => void;
  onDemoButtonClick: () => void;
  onGameBackgroundChange: () => void;
  onGameMainImageChange: () => void;
}

const GameDetails: FC<GameDetailsProps> = ({
  data,
  refetch,
  isFetching,
  originalArgs,
  onPlayButtonClick,
  onDemoButtonClick,
  onGameBackgroundChange,
  onGameMainImageChange
}) => {
  const t = useTranslation();
  const dispatch = useDispatch();

  const [changeGameStatus, { isLoading }] = gameApi.useChangeGameStatusMutation();

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
    actionFn: (gameIds) => {
      return changeGameStatus({
        gameIds,
        statusId: GameStatusesEnum.INACTIVE,
        lastUpdatedByUserId: 2,
        lastUpdatedByUserEmail: 'test@gmail.com'
      }).unwrap();
    },
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

  const breadCrumbs = useMemo(
    () => [
      {
        label: t.get('gameManagement'),
        isRedirect: true,
        componentProps: {
          onClick: () => redirectToURL('/game')
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
        ...(data.statusId === GameStatusesEnum.INACTIVE
          ? [
              {
                iconName: 'CheckButtonIcon' as const,
                onClick: () =>
                  onActivateButtonClick({
                    gameId: data.gameId,
                    name: data.gameName
                  }),
                tooltipText: t.get('activate')
              }
            ]
          : []),
        ...(data.statusId === GameStatusesEnum.ACTIVE
          ? [
              {
                iconName: 'BlockButtonIcon' as const,
                onClick: () =>
                  onInActivateButtonClick({
                    gameId: data.gameId,
                    name: data.gameName
                  }),
                tooltipText: t.get('inActivate')
              }
            ]
          : [])
      ]
    }),
    [onActivateButtonClick, onInActivateButtonClick, data, t]
  );

  const buttons = useMemo(
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

  const tabs = useMemo(
    () => [
      {
        title: t.get('generalInformation'),
        value: 1,
        content: <GameGeneralInformationContainer data={data} />
      },
      {
        title: t.get('assets'),
        value: 2
      }
    ],
    [data]
  );

  return (
    <DetailsPage
      breadCrumbLinks={breadCrumbs}
      sidebarContent={
        <GameDetailsSidebar
          buttons={buttons}
          backgroundImgUrl={data.backGroundImage || ''}
          gameId={data.gameId}
          gameName={data.gameName}
          mainImgUrl={data.icon || ''}
          statusInfo={statusInfo}
          creationDate={convertDate(data.creationDate)}
          createdBy={data.createdByUserEmail}
          lastUpdateDate={convertDate(data.lastUpdatedDate)}
          lastUpdateBy={data.lastUpdatedByUserEmail}
          refetch={refetch}
          onBackgroundImgClick={onGameBackgroundChange}
          onMainImgClick={onGameMainImageChange}
        />
      }>
      <ItemDetails tabs={tabs} defaultTabValue={1}></ItemDetails>
    </DetailsPage>
  );
};

export default GameDetails;
