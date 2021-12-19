import { gameApi, providerApi } from '@/adapter/redux/api';
import { ProviderStatusesEnum } from '@/domain/models';
import { ROUTES } from '@/view/constants';
import { ProviderGamesFilterViewModel } from '@/view/models';
import { gameLaunchService } from '@/view/services';
import { PrimaryKey, redirectToURL, useFirstValue, useTranslation } from '@atom/common';
import { ProviderGames } from '@atom/design-system';
import { useCallback, useEffect, useMemo, useState } from 'react';

export interface ProviderGamesContainerProps {
  providerId: PrimaryKey;
  providerStatusId: ProviderStatusesEnum;
}

export const ProviderGamesContainer = ({ providerId, providerStatusId }: ProviderGamesContainerProps) => {
  const t = useTranslation();

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
    filters.providerId,
    {
      refetchOnMountOrArgChange: true
    }
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

  const hasGames = !!firstGames?.results?.length;

  const translations = useMemo(
    () => ({
      addGame: t.get('add'),
      noGames: hasGames ? t.get('noDataFound') : t.get('providerDoesntHaveGames'),
      search: t.get('search')
    }),
    [hasGames, t]
  );

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
      translations={translations}
      gameTypes={providerGameTypes || []}
      games={games}
      onChange={onFiltersChange}
      onGameClick={(gameId) => {
        gameLaunchService.publish({
          gameId,
          gameLaunchUrl: 'https://demo.casinocontroller.com/rival/engine/EmbedGame/EmbedGame.php',
          providerId
        });
      }}
      onAddGameClick={onAddGameClick}
      isLoadingGames={isFetching}
      isAllGamesLoaded={isAllGamesLoaded}
      isTabLoading={isGameTypesFetching || isTabLoading}
      hasGames={hasGames}
      shouldShowAddGameButton={providerStatusId === ProviderStatusesEnum.Active}
    />
  );
};
