import { gameApi } from '@/adapter/redux/api';
import { GamesFiltersViewModel, GetGamesViewModel } from '@/view/models';
import { SortTypesEnum, useFirstValue, useTranslation } from '@atom/common';
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
      releaseDate: null,
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

  const { data, requestId, isFetching } = gameApi.useGetGamesQuery(filters);

  const [changeGameStatus] = gameApi.useChangeGameStatusMutation();

  const { results, rowCount } = (data || {}) as GetGamesViewModel;

  const firstRequestId = useFirstValue(requestId);

  

  return (
    <>
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
      />
    </>
  );
};

export default GameListContainer;
