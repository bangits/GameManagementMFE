import { gameApi, providerApi } from '@/adapter/redux/api';
import { ROUTES } from '@/view/constants';
import { ProviderGamesFilterViewModel } from '@/view/models';
import { gameLaunchService } from '@/view/services';
import { AuthenticatedContext } from '@atom/authorization';
import { PrimaryKey, redirectToURL, useFirstValue } from '@atom/common';
import { ProviderGames } from '@atom/design-system';
import { useCallback, useContext, useEffect, useState } from 'react';

export interface ProviderGamesContainerProps {
  providerId: PrimaryKey;
}

export const ProviderGamesContainer = ({ providerId }: ProviderGamesContainerProps) => {
  const { user } = useContext(AuthenticatedContext);

  const [filters, setFilters] = useState<ProviderGamesFilterViewModel>({
    gameSearch: '',
    gameTypeId: null,
    pagination: {
      page: 1,
      pageSize: 18
    },
    providerId
  });

  const { data, isFetching } = gameApi.useGetGamesByProviderIdQuery(filters);
  const { data: providerGameTypes, isFetching: isGameTypesFetching } = providerApi.useGetProviderGameTypesAndCountQuery(
    filters.providerId
  );

  const [games, setGames] = useState<typeof data['results']>([]);
  const [isAllGamesLoaded, setAllGamesLoaded] = useState(false);
  const [isTabLoading, setTabLoading] = useState(true);

  const firstGames = useFirstValue(data);

  const onFiltersChange = useCallback(
    (gameTypeId: PrimaryKey, search: string, page: number) => {
      if (gameTypeId !== filters.gameTypeId || search !== filters.gameSearch) {
        setGames([]);

        setTabLoading(true);
      }

      setFilters({
        ...filters,
        pagination: {
          ...filters.pagination,
          page
        },
        gameTypeId,
        gameSearch: search
      });
    },
    [filters]
  );

  const onAddGameClick = useCallback(() => {
    redirectToURL(ROUTES.baseUrl + ROUTES.game + ROUTES.gameAdd + `?providerId=${providerId}`);
  }, [providerId]);

  useEffect(() => {
    if (data) {
      setGames([...games, ...data.results]);

      setAllGamesLoaded(!data.results.length);

      setTimeout(() => setTabLoading(false), 300);
    }
  }, [data]);

  return (
    <ProviderGames
      searchInputMaxLength={30}
      translations={{
        addGame: 'Add Game',
        noGames: 'No Games',
        search: 'Search'
      }}
      gameTypes={providerGameTypes || []}
      games={games}
      onChange={onFiltersChange}
      onGameClick={(gameId) => {
        gameLaunchService.publish({
          gameId,
          gameLaunchUrl: '',
          providerId
        });
      }}
      onAddGameClick={onAddGameClick}
      isLoadingGames={isFetching}
      isAllGamesLoaded={isAllGamesLoaded}
      isTabLoading={isGameTypesFetching || isTabLoading}
      hasGames={!!firstGames?.results?.length}
    />
  );
};
