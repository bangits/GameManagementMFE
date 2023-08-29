import { useCallback, useRef, useState } from 'react';
import { Icons, ItemsList, ScrollableViewProps, TextInput } from '@atom/design-system';
import { Button, Loader, Tag, Typography } from '@my-ui/core';
import { PrimaryKey, useTranslation } from '@atom/common';
import { hstack, vstack } from 'styled-system/patterns';
import { ProviderGamesCard } from './ProviderGamesCard';
import { css } from 'styled-system/css';
import { ProviderGameViewModel, ProviderGamesFilterViewModel } from '@/atom-game-management';

export interface ProviderGamesProps {
  gameTypes: {
    id?: string | number;
    name: string;
    gameCount: number;
  }[];
  providerName: string;
  games: ProviderGameViewModel[];
  initialFilters: ProviderGamesFilterViewModel;
  filters: ProviderGamesFilterViewModel;
  isFiltering: boolean;
  isTabLoading: boolean;
  scrollableViewProps: ScrollableViewProps;
  onAddGameClick?: () => void;
  onFilterChange: (updatedFilters: ProviderGamesFilterViewModel) => Promise<void>;
  onGameClick(gameId: PrimaryKey, isDemo: boolean): void;
  onGameDetailsClick(gameId: PrimaryKey): void;
}

export const ProviderGames = ({
  gameTypes,
  games,
  initialFilters,
  filters,
  onGameClick,
  onFilterChange,
  providerName,
  onAddGameClick,
  isTabLoading,
  isFiltering,
  scrollableViewProps,
  onGameDetailsClick
}: ProviderGamesProps) => {
  const t = useTranslation();
  const [searchValue, setSearchValue] = useState('');
  const latestSearchValue = useRef('');

  const handleSearch = useCallback(() => {
    if (!(latestSearchValue.current && !searchValue.length) && searchValue.length < 3) return;
    latestSearchValue.current = searchValue;

    const newFilters: ProviderGamesFilterViewModel = {
      ...filters,
      gameSearch: searchValue,
      pagination: { ...initialFilters.pagination, page: 1 }
    };
    onFilterChange(newFilters);
  }, [onFilterChange, searchValue, initialFilters, filters]);

  const handleTagClick = useCallback(
    (type) => {
      const newFilters: ProviderGamesFilterViewModel = {
        ...filters,
        pagination: { ...initialFilters.pagination, page: 1 },
        gameTypeId: type.id === filters.gameTypeId ? '' : type.id
      };
      onFilterChange(newFilters);
    },
    [onFilterChange, initialFilters, filters]
  );

  return (
    <div className={css({ width: '100%' })}>
      <div className={hstack({ justifyContent: 'space-between' })}>
        <div>
          {!isTabLoading && (
            <TextInput
              label={t.get('search')}
              endIcon={<Icons.Search onClick={handleSearch} />}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              maxLength={30}
            />
          )}
        </div>
        <div>
          <Button
            type='button'
            variant='link'
            startIcon={<Icons.PlusCircleLarge onClick={() => onAddGameClick()} />}
            onClick={onAddGameClick}>
            {t.get('add')}
          </Button>
        </div>
      </div>

      {isTabLoading || isFiltering ? (
        <div className={vstack({ width: '100%', marginTop: '10%' })}>
          <Loader />
        </div>
      ) : games && games.length ? (
        <div>
          <div className={hstack({ flexWrap: 'wrap', cursor: 'pointer' })}>
            {gameTypes.map((type) => (
              <Tag
                key={type.id}
                closeIcon={false}
                title={`${type.name}(${type.gameCount})`}
                inactive={filters.gameTypeId !== type.id}
                onClick={() => handleTagClick(type)}
              />
            ))}
          </div>

          <ItemsList scrollableViewProps={{ ...scrollableViewProps, height: '40rem' }}>
            {games.map((game) => (
              <ProviderGamesCard
                data={game}
                key={game.id}
                providerName={providerName}
                onGameDetailsClick={() => onGameDetailsClick(game.id)}
                onGameClick={(id, isDemo) => onGameClick(id, isDemo)}
              />
            ))}
          </ItemsList>
        </div>
      ) : (
        <div className={vstack({ width: '100%' })}>
          <span>
            <Icons.EmptyGameListIcon />
          </span>
          <Typography component='p' variant='p3'>
            {filters.gameSearch || filters.gameTypeId ? t.get('noDataFound') : t.get('providerDoesntHaveGames')}
          </Typography>
        </div>
      )}
    </div>
  );
};
