import { GameStatusesEnum } from '@/domain/models/enums';
import { ROUTES } from '@/view/constants';
import { GamesFiltersViewModel, GameStatusesSortingEnum, GamesViewModel } from '@/view/models';
import { CurrencySelect, redirectToURL, TablePage, useTranslation } from '@atom/common';
import { FetchDataParameters, Icons, PageWrapper } from '@atom/design-system';
import { useMemo } from 'react';
GamesFiltersViewModel;
export interface GameListProps {
  onFiltersChange: (parameters: FetchDataParameters<GamesViewModel, GamesFiltersViewModel>) => void;
  filters: GamesFiltersViewModel;
  results: GamesViewModel[];
  rowCount: number;
}

function GameList({ filters, results, onFiltersChange, rowCount }: GameListProps) {
  const tableColumns = useMemo(
    () => [
      {
        Header: 'Game ID',
        accessor: 'gameId' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.GAME_ID
      },
      {
        Header: 'Logo',
        accessor: 'logo' as keyof GamesViewModel,
        disableSortBy: true,
        variant: 'image' as const
        // sortingId: GameStatusesSortingEnum.LOGO
      },
      {
        Header: 'Game name',
        accessor: 'gameName' as keyof GamesViewModel
        // sortingId: GameStatusesSortingEnum.PROVIDER_NAME
      },
      {
        Header: 'Total game count',
        accessor: 'totalGameCount' as keyof GamesViewModel
        // sortingId: GameStatusesSortingEnum.GAME_COUNT
      },
      {
        Header: 'Default currency',
        accessor: 'defaultCurrency' as keyof GamesViewModel,
        disableSortBy: true
        // sortingId: GameStatusesSortingEnum.DEFAULT_CURRENCY
      },
      {
        Header: 'Status',
        accessor: 'status' as keyof GamesViewModel,
        disableSortBy: true,
        variant: 'status' as const,
        // sortingId: GameStatusesSortingEnum.STATUS,
        getVariant: (value: number) => (value === GameStatusesEnum.Active ? 'active' : 'blocked'),
        getVariantName: (value: number) => (value === GameStatusesEnum.Active ? 'Active' : 'Blocked')
      }
    ],
    []
  );

  const t = useTranslation();

  const filtersList = useMemo(
    () => [
      {
        name: 'gameName',
        type: 'custom' as const,
        label: t.get('games.fields.gameName'),
        component: ({ onChange }) => (
          <CurrencySelect
            isMulti
            inputLabel={t.get('games.fields.defaultCurrency')}
            fullWidth
            onChange={(changedValue) => onChange('currency', changedValue)}
          />
        )
      },
      {
        label: t.get('games.fields.gameId'),
        name: 'gameId',
        type: 'input' as const,
        props: {
          label: t.get('games.fields.gameId')
        }
      },
      {
        label: t.get('games.fields.gameCount'),
        type: 'from-to' as const,
        name: 'gameCount',
        fromInputProps: {
          label: t.get('games.fields.gameCountFrom'),
          type: 'number'
        },
        toInputProps: {
          label: t.get('games.fields.gameCountTo'),
          type: 'number'
        }
      },
      {
        label: t.get('games.fields.defaultCurrency'),
        name: 'currency',
        type: 'select' as const
      },
      {
        label: t.get('statuses.name'),
        name: 'status',
        type: 'select' as const,
        props: {
          selectAll: true,
          inputLabel: t.get('statuses.name'),
          selectAllLabel: t.get('statuses.all'),
          options: [
            { label: t.get('statuses.active'), value: GameStatusesEnum.Active },
            { label: t.get('statuses.blocked'), value: GameStatusesEnum.Blocked },
            { label: t.get('statuses.inActive'), value: GameStatusesEnum.Inactive },
            { label: t.get('statuses.removed'), value: GameStatusesEnum.Removed }
          ],
          isSearchable: true,
          isMulti: true
        }
      }
    ],
    [t]
  );

  const addGameButtonProps = useMemo(
    () => ({
      children: t.get('games.list.addGameButton'),
      startIcon: <Icons.PlusCircle />,
      onClick: () => redirectToURL(ROUTES.baseUrl + ROUTES.game + ROUTES.gameAdd)
    }),
    [t]
  );

  return (
    <PageWrapper title={t.get('games.list.title')} showButton buttonProps={addGameButtonProps}>
      <TablePage
        fetchData={onFiltersChange}
        filterProps={{
          defaultOpened: true,
          initialValues: filters,
          //@ts-expect-error asd
          filters: filtersList
        }}
        tableProps={{
          // @ts-expect-error Disabled typescript, because ObjectMock[] is GamesViewModel[]
          data: results,
          columns: tableColumns
        }}
        rowCount={rowCount}
        onEditButtonClick={() => {
          const mockEdit = {};
        }}
        onViewButtonClick={() => {
          const mockView = {};
        }}
      />
    </PageWrapper>
  );
}

export default GameList;
