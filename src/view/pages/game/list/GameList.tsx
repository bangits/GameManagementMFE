import { GameStatusesEnum } from '@/domain/models/enums';
import {
  GameClassSelect,
  GameFeaturesSelect,
  GameSupportedBrowsersSelect,
  GameThemesSelect,
  GameTypesSelect,
  GameVolatilitiesSelect,
  ProviderSelect
} from '@/view';
import { ROUTES } from '@/view/constants';
import { GamesFiltersViewModel, GameStatusesSortingEnum, GamesViewModel, HasDemoEnum } from '@/view/models';
import {
  CountriesSelect,
  CurrencySelect,
  LanguageSelect,
  redirectToURL,
  TablePage,
  useTranslation
} from '@atom/common';
import { FetchDataParameters, Icons, PageWrapper } from '@atom/design-system';
import { useMemo, useState } from 'react';

export interface GameListProps {
  onFiltersChange: (parameters: FetchDataParameters<GamesViewModel, GamesFiltersViewModel>) => void;
  filters: GamesFiltersViewModel;
  results: GamesViewModel[];
  rowCount: number;
  isFilteredData: boolean;
}

function GameList({ filters, results, onFiltersChange, rowCount, isFilteredData }: GameListProps) {
  const t = useTranslation();
  const [date, setDate] = useState<Date | null>(null);

  const tableColumns = useMemo(
    () => [
      {
        Header: t.get('games.list.tableHeaders.logo'),
        accessor: 'logo' as keyof GamesViewModel,
        variant: 'image' as const,
        sortingId: GameStatusesSortingEnum.LOGO
      },
      {
        Header: t.get('games.list.tableHeaders.gameName'),
        accessor: 'gameName' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.GAME_NAME
      },
      {
        Header: t.get('games.list.tableHeaders.gameId'),
        accessor: 'gameId' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.GAME_ID
      },

      {
        Header: t.get('games.list.tableHeaders.externalId'),
        accessor: 'externalId' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.EXTERNAL_ID
      },
      {
        Header: t.get('games.list.tableHeaders.providerName'),
        accessor: 'providerName' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.PROVIDER_NAME
      },
      {
        Header: t.get('games.list.tableHeaders.providerId'),
        accessor: 'providerId' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.PROVIDER_ID
      },
      {
        Header: t.get('games.list.tableHeaders.type'),
        accessor: 'type' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.TYPE
      },
      {
        Header: t.get('games.list.tableHeaders.subtype'),
        accessor: 'subtype' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.SUBTYPE
      },
      {
        Header: t.get('games.list.tableHeaders.volatility'),
        accessor: 'volatility' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.VOLATILITY
      },
      {
        Header: t.get('games.list.tableHeaders.rtp'),
        accessor: 'rtp' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.RTP
      },
      {
        Header: t.get('games.list.tableHeaders.class'),
        accessor: 'class' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.CLASS
      },
      {
        Header: t.get('games.list.tableHeaders.releaseDate'),
        accessor: 'releaseDate' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.RELEASE_DATE
      },
      {
        Header: t.get('games.list.tableHeaders.creationDate'),
        accessor: 'creationDate' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.CREATION_DATE
      },
      {
        Header: t.get('games.list.tableHeaders.createdBy'),
        accessor: 'createdBy' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.CREATED_BY
      },
      {
        Header: t.get('games.list.tableHeaders.status'),
        accessor: 'status' as keyof GamesViewModel,
        variant: 'status' as const,
        sortingId: GameStatusesSortingEnum.STATUS,
        getVariant: (value: number) => (value === GameStatusesEnum.Active ? 'active' : 'blocked'),
        getVariantName: (value: number) => (value === GameStatusesEnum.Active ? 'Active' : 'Blocked')
      }
    ],
    []
  );

  const filtersList = useMemo(
    () => [
      {
        name: 'gameId',
        type: 'input' as const,
        props: {
          label: t.get('games.list.fields.gameId')
        }
      },

      {
        name: 'externalId',
        type: 'input' as const,
        props: {
          label: t.get('games.list.fields.externalId')
        }
      },
      {
        name: 'name',
        type: 'input' as const,
        props: {
          label: t.get('games.list.fields.gameName')
        }
      },

      {
        name: 'providerName',
        type: 'custom' as const,
        component: ({ onChange }) => (
          <ProviderSelect
            isMulti
            inputLabel={t.get('games.fields.providerName')}
            fullWidth
            onChange={(changedValue) => onChange('providerName', changedValue)}
          />
        )
      },
      {
        name: 'type',
        type: 'custom' as const,
        label: t.get('games.list.fields.type'),
        component: ({ onChange }) => (
          <GameTypesSelect
            inputLabel={t.get('games.list.fields.type')}
            fullWidth
            onChange={(changedValue) => onChange('type', changedValue)}
          />
        )
      },
      {
        name: 'subType',
        type: 'custom' as const,
        component: ({ onChange }) => 'SubType'
      },
      {
        label: t.get('games.fields.rtp.title'),
        type: 'from-to' as const,
        name: 'rtp',
        fromInputProps: {
          label: t.get('games.list.fields.rtp.from'),
          type: 'number'
        },
        toInputProps: {
          label: t.get('games.list.fields.rtp.to'),
          type: 'number'
        }
      },
      //datepicker
      {
        type: 'datepicker',
        name: 'releaseDate',
        label: t.get('games.list.fields.releaseDate'),

        props: {
          onChange: (date: Date) => setDate(date),
          placeholderText: 'dd/mm/yyyy',
          dateFormat: 'dd/MM/yyyy',
          selected: date || new Date()
        }
      },
      {
        name: 'class',
        type: 'custom' as const,
        component: ({ onChange }) => (
          <GameClassSelect
            inputLabel={t.get('games.list.fields.class')}
            fullWidth
            onChange={(changedValue) => onChange('class', changedValue)}
          />
        )
      },
      {
        name: 'hasDemo',
        type: 'select' as const,
        props: {
          selectAll: true,
          inputLabel: t.get('games.list.fields.hasDemo.title'),
          selectAllLabel: t.get('games.list.fields.hasDemo.all'),
          options: [
            { label: t.get('games.list.fields.hasDemo.yes'), value: HasDemoEnum.YES },
            { label: t.get('games.list.fields.hasDemo.no'), value: HasDemoEnum.NO }
          ],
          isSearchable: true,
          isMulti: true
        }
      },
      {
        name: 'theme',
        type: 'custom' as const,
        component: ({ onChange }) => (
          <GameThemesSelect
            inputLabel={t.get('games.list.fields.theme')}
            fullWidth
            onChange={(changedValue) => onChange('theme', changedValue)}
          />
        )
      },
      {
        name: 'feature',
        type: 'custom' as const,
        component: ({ onChange }) => (
          <GameFeaturesSelect
            inputLabel={t.get('games.list.fields.feature')}
            fullWidth
            onChange={(changedValue) => onChange('feature', changedValue)}
          />
        )
      },
      {
        name: 'device',
        type: 'custom' as const,
        label: t.get('games.list.fields.device'),
        component: ({ onChange }) => (
          <ProviderSelect
            inputLabel={t.get('games.list.fields.device')}
            fullWidth
            onChange={(changedValue) => onChange('providerName', changedValue)}
          />
        )
      },
      {
        name: 'supportedCurrencies',
        type: 'custom' as const,
        label: t.get('games.list.fields.supportedCurrencies'),
        component: ({ onChange }) => (
          <CurrencySelect
            isMulti
            inputLabel={t.get('games.list.fields.supportedCurrencies')}
            fullWidth
            onChange={(changedValue) => onChange('supportedCurrencies', changedValue)}
          />
        )
      },
      {
        name: 'supportedBrowsers',
        type: 'custom' as const,
        label: t.get('games.list.fields.supportedBrowsers'),
        component: ({ onChange }) => (
          <GameSupportedBrowsersSelect
            isMulti
            inputLabel={t.get('games.list.fields.supportedBrowsers')}
            fullWidth
            onChange={(changedValue) => onChange('providerName', changedValue)}
          />
        )
      },

      {
        name: 'certifiedCountries',
        type: 'custom' as const,
        label: t.get('games.list.fields.certifiedCountries'),
        component: ({ onChange }) => (
          <CountriesSelect
            isMulti
            inputLabel={t.get('games.list.fields.certifiedCountries')}
            fullWidth
            onChange={(changedValue) => onChange('certifiedCountries', changedValue)}
          />
        )
      },
      {
        name: 'restrictedCountries',
        type: 'custom' as const,
        label: t.get('games.list.fields.restrictedCountries'),
        component: ({ onChange }) => (
          <CountriesSelect
            isMulti
            inputLabel={t.get('games.list.fields.restrictedCountries')}
            fullWidth
            onChange={(changedValue) => onChange('restrictedCountries', changedValue)}
          />
        )
      },
      {
        name: 'volatility',
        type: 'custom' as const,
        label: t.get('games.list.fields.volatility'),
        component: ({ onChange }) => (
          <GameVolatilitiesSelect
            isMulti
            inputLabel={t.get('games.list.fields.volatility')}
            fullWidth
            onChange={(changedValue) => onChange('volatility', changedValue)}
          />
        )
      },
      {
        name: 'uILanguages',
        type: 'custom' as const,
        label: t.get('games.list.fields.uILanguages'),
        component: ({ onChange }) => (
          <LanguageSelect
            isMulti
            inputLabel={t.get('games.list.fields.uILanguages')}
            fullWidth
            onChange={(changedValue) => onChange('providerName', changedValue)}
          />
        )
      },
      {
        name: 'operatingLanguages',
        type: 'custom' as const,
        label: t.get('games.list.fields.operatingLanguages'),
        component: ({ onChange }) => (
          <LanguageSelect
            isMulti
            inputLabel={t.get('games.list.fields.operatingLanguages')}
            fullWidth
            onChange={(changedValue) => onChange('providerName', changedValue)}
          />
        )
      },
      //date picker is not finished
      {
        type: 'datepicker',
        name: 'creationDate',
        label: t.get('games.list.fields.creationDate'),

        props: {
          onChange: (date: Date) => setDate(date),
          placeholderText: 'dd/mm/yyyy',
          dateFormat: 'dd/MM/yyyy',
          selected: date || new Date()
        }
      },
      {
        name: 'createdBy',
        type: 'input' as const,
        props: {
          label: t.get('games.list.fields.createdBy')
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
          data: results,
          columns: tableColumns,
          illustrationIcon: isFilteredData ? <Icons.NoDataIcon /> : <Icons.EmptyDataIcon />,
          emptyText: isFilteredData ? 'Please make a different filter selection.' : 'You don’t have any partners added!'
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
