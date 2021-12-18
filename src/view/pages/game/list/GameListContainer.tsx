import { gameApi } from '@/adapter/redux/api';
import { GameStatusesEnum } from '@/domain/models';
import { GameLauncherContainer } from '@/view';
import { showGameActivateDialog, showGameInActivateDialog } from '@/view/dialogs';
import { GamesFiltersViewModel, GamesViewModel, GetGamesViewModel } from '@/view/models';
import { SortTypesEnum, useActionWithDialog, useFirstValue, useTranslation } from '@atom/common';
import { useMemo, useState } from 'react';
import GameList from './GameList';

const GameListContainer = () => {
  const t = useTranslation();

  const initialFilters = useMemo<GamesFiltersViewModel>(
    () => ({
      gameId: '',
      externalId: '',
      icon: '',
      name: '',
      providerIds: '',
      volatilityIds: '',
      rtp: { from: '', to: '' },
      classIds: '',
      hasDemo: null,
      status: null,
      gameThemeIds: [],
      gameFeatureIds: [],
      gamePlatformIds: [],
      releaseDate: [null, null],
      createdBy: '',
      creationDate: [null, null],
      sorting: null,
      gameCertifiedCountries: [],
      gameRestrictedCountryIds: [],
      gameCurrencyIds: '',
      gameSupportedBrowserIds: '',
      gameUiLanguageIds: [],
      gameOperatingLanguageIds: [],
      subTypeIds: [],
      type: '',
      pagination: {
        page: 1,
        pageSize: 20
      }
    }),
    []
  );

  const [filters, setFilters] = useState<GamesFiltersViewModel>(initialFilters);

  const { data, requestId, isFetching, refetch } = gameApi.useGetGamesQuery(filters);

  const [changeGameStatus] = gameApi.useChangeGameStatusMutation();

  const { results, rowCount } = (data || {}) as GetGamesViewModel;

  const firstRequestId = useFirstValue(requestId);

  const { openDialogFn: onActivateButtonClick, columnLoadingIds: activeColumnLoadingIds } =
    useActionWithDialog<GamesViewModel>({
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
      refetch,
      getColumnId: (column) => column.gameId
    });

  const { openDialogFn: onInActivateButtonClick, columnLoadingIds: inActiveColumnLoadingIds } =
    useActionWithDialog<GamesViewModel>({
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
      refetch,
      getColumnId: (column) => column.gameId
    });

  const gameTableLoadingIds = useMemo(
    () => [...activeColumnLoadingIds, ...inActiveColumnLoadingIds],
    [activeColumnLoadingIds, inActiveColumnLoadingIds]
  );

  return (
    <>
      <GameLauncherContainer />

      <GameList
        results={results || []}
        rowCount={rowCount || 1}
        isFilteredData={firstRequestId !== requestId}
        isFetching={isFetching}
        filters={filters}
        onFiltersChange={(parameters) => {
          const sorting = parameters.sortedBy
            ? {
                direction: parameters.sortedBy.desc ? SortTypesEnum.DESC : SortTypesEnum.ASC,
                propertyId: parameters.sortedBy.id
              }
            : null;

          setFilters({
            ...filters,
            ...parameters.filters,
            sorting
          });
        }}
        onActivateButtonClick={onActivateButtonClick}
        shouldShowActivateButton={(column) => column.statusId === GameStatusesEnum.INACTIVE}
        onInActivateButtonClick={onInActivateButtonClick}
        shouldShowInActivateButton={(column) => column.statusId === GameStatusesEnum.ACTIVE}
        gameTableLoadingIds={gameTableLoadingIds}
      />
    </>
  );
};

export default GameListContainer;
