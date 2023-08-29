import { useCallback } from 'react';
import { gameApi, providerApi } from '@/adapter/redux/api';
import { historyService, PrimaryKey, useLoadMore } from '@atom/common';
import { ProviderStatusesEnum } from '@/domain/models';
import { ROUTES } from '@/view/constants';
import { ProviderGameViewModel, ProviderGamesFilterViewModel } from '@/view/models';
import { ProviderGames } from './ProviderGames';
import { useProviderGamesInitialValues } from './useProviderGamesInitialValues';
import { gameLaunchService } from '@/view/services';

export interface ProviderGamesContainerProps {
  providerId: PrimaryKey;
  providerName: string;
  providerStatusId: ProviderStatusesEnum;
}

export const ProviderGamesContainer = ({ providerId, providerName }: ProviderGamesContainerProps) => {
  const { initialFilters } = useProviderGamesInitialValues(providerId);

  const [getGames] = gameApi.useLazyGetGamesByProviderIdQuery();
  const { data: providerGameTypes, isFetching: isGameTypesFetching } = providerApi.useGetProviderGameTypesAndCountQuery(
    providerId,
    {
      refetchOnMountOrArgChange: true
    }
  );

  const { data, filters, isFiltering, isInitialFiltering, onFiltersChange, scrollableViewProps } = useLoadMore<
    ProviderGameViewModel,
    ProviderGamesFilterViewModel
  >({
    action: getGames as any,
    initialFilters
  });

  const onGameClick = useCallback(
    (gameId, isDemo) => {
      const clickedGame = data.find((game) => game.id === gameId);

      if (!clickedGame) return;

      gameLaunchService.publish({
        gameId: clickedGame.externalId,
        gameExternalId: clickedGame.id.toString(),
        gameLaunchUrl: isDemo ? clickedGame.providerAbsoluteDemoUrl : clickedGame.providerAbsoluteUrl,
        providerId,
        providerName,
        isDemo,
        gameBackground: clickedGame.backGroundImage
      });
    },
    [data]
  );

  const onGameDetailsClick = useCallback(
    (gameId) =>
      historyService.redirectToURL(
        ROUTES.baseUrl + ROUTES.game + ROUTES.gameDetails.replace(':gameId', gameId.toString())
      ),
    [historyService]
  );

  const onGameAddClick = useCallback(() => {
    historyService.redirectToURL(ROUTES.baseUrl + ROUTES.game + ROUTES.gameAdd + `?providerId=${providerId}`);
  }, [providerId]);

  return (
    <ProviderGames
      gameTypes={providerGameTypes || []}
      games={data || []}
      providerName={providerName}
      initialFilters={initialFilters}
      filters={filters}
      isFiltering={isFiltering}
      isTabLoading={isGameTypesFetching || isInitialFiltering}
      scrollableViewProps={scrollableViewProps}
      onFilterChange={onFiltersChange}
      onAddGameClick={onGameAddClick}
      onGameClick={onGameClick}
      onGameDetailsClick={onGameDetailsClick}
    />
  );
};
