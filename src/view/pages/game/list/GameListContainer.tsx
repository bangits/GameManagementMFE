import { gameApi } from '@/adapter/redux/api';
import { GamesFiltersViewModel, GetGamesViewModel } from '@/view/models';
import { SortTypesEnum } from '@atom/common';
import { useMemo, useState } from 'react';
import GameList from './GameList';

const GameListContainer = () => {
  const initialFilters = useMemo<GamesFiltersViewModel>(
    () => ({
      gameId: null,
      gameName: null,
      currency: [],
      gameCount: {
        from: null,
        to: null
      },
      status: [],
      sorting: null,
      pagination: {
        page: 1,
        pageSize: 20
      }
    }),
    []
  );

  const [filters, setFilters] = useState<GamesFiltersViewModel>(initialFilters);

  const { data } = gameApi.useGetGameQuery(filters);

  const { results, rowCount } = (data || {}) as GetGamesViewModel;

  return (
    <>
      <GameList
        results={results || []}
        rowCount={rowCount || 1}
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
