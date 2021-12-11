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
  isFetching: boolean;
}

function GameList({ filters, results, onFiltersChange, rowCount, isFilteredData, isFetching }: GameListProps) {
  const t = useTranslation();

  const [date, setDate] = useState<Date | null>(null);

  const tableColumns = useMemo(
    () => [
      {
        Header: t.get('logo'),
        accessor: 'logo' as keyof GamesViewModel,
        variant: 'image' as const,
        sortingId: GameStatusesSortingEnum.LOGO
      },
      {
        Header: t.get('gameName'),
        accessor: 'gameName' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.GAME_NAME
      },
      {
        Header: t.get('gameId'),
        accessor: 'gameId' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.GAME_ID
      },

      {
        Header: t.get('externalId'),
        accessor: 'externalId' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.EXTERNAL_ID
      },
      {
        Header: t.get('providerName'),
        accessor: 'providerName' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.PROVIDER_NAME
      },
      {
        Header: t.get('providerId'),
        accessor: 'providerId' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.PROVIDER_ID
      },
      {
        Header: t.get('type'),
        accessor: 'type' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.TYPE
      },
      {
        Header: t.get('subtype'),
        accessor: 'subtype' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.SUBTYPE
      },
      {
        Header: t.get('volatility'),
        accessor: 'volatility' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.VOLATILITY
      },
      {
        Header: t.get('rtp'),
        accessor: 'rtp' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.RTP
      },
      {
        Header: t.get('class'),
        accessor: 'class' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.CLASS
      },
      {
        Header: t.get('releaseDate'),
        accessor: 'releaseDate' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.RELEASE_DATE
      },
      {
        Header: t.get('creationDate'),
        accessor: 'creationDate' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.CREATION_DATE
      },
      {
        Header: t.get('createdBy'),
        accessor: 'createdBy' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.CREATED_BY
      },
      {
        Header: t.get('status'),
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
          label: t.get('gameId')
        }
      },

      {
        name: 'externalId',
        type: 'input' as const,
        props: {
          label: t.get('externalId')
        }
      },
      {
        name: 'name',
        type: 'input' as const,
        props: {
          label: t.get('gameName')
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
        label: t.get('type'),
        component: ({ onChange }) => (
          <GameTypesSelect
            inputLabel={t.get('type')}
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
          label: t.get('rtpFrom'),
          type: 'number'
        },
        toInputProps: {
          label: t.get('rtpTo'),
          type: 'number'
        }
      },
      {
        type: 'datepicker',
        name: 'releaseDate',
        label: t.get('releaseDate'),

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
            inputLabel={t.get('class')}
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
          inputLabel: t.get('hasDemo'),
          selectAllLabel: t.get('all'),
          options: [
            { label: t.get('yes'), value: HasDemoEnum.YES },
            { label: t.get('no'), value: HasDemoEnum.NO }
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
            inputLabel={t.get('theme')}
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
            inputLabel={t.get('feature')}
            fullWidth
            onChange={(changedValue) => onChange('feature', changedValue)}
          />
        )
      },
      {
        name: 'device',
        type: 'custom' as const,
        label: t.get('device'),
        component: ({ onChange }) => (
          <ProviderSelect
            inputLabel={t.get('device')}
            fullWidth
            onChange={(changedValue) => onChange('providerName', changedValue)}
          />
        )
      },
      {
        name: 'supportedCurrencies',
        type: 'custom' as const,
        label: t.get('supportedCurrencies'),
        component: ({ onChange }) => (
          <CurrencySelect
            isMulti
            inputLabel={t.get('supportedCurrencies')}
            fullWidth
            onChange={(changedValue) => onChange('supportedCurrencies', changedValue)}
          />
        )
      },
      {
        name: 'supportedBrowsers',
        type: 'custom' as const,
        label: t.get('supportedBrowsers'),
        component: ({ onChange }) => (
          <GameSupportedBrowsersSelect
            isMulti
            inputLabel={t.get('supportedBrowsers')}
            fullWidth
            onChange={(changedValue) => onChange('providerName', changedValue)}
          />
        )
      },

      {
        name: 'certifiedCountries',
        type: 'custom' as const,
        label: t.get('certifiedCountries'),
        component: ({ onChange }) => (
          <CountriesSelect
            isMulti
            inputLabel={t.get('certifiedCountries')}
            fullWidth
            onChange={(changedValue) => onChange('certifiedCountries', changedValue)}
          />
        )
      },
      {
        name: 'restrictedCountries',
        type: 'custom' as const,
        label: t.get('restrictedCountries'),
        component: ({ onChange }) => (
          <CountriesSelect
            isMulti
            inputLabel={t.get('restrictedCountries')}
            fullWidth
            onChange={(changedValue) => onChange('restrictedCountries', changedValue)}
          />
        )
      },
      {
        name: 'volatility',
        type: 'custom' as const,
        label: t.get('volatility'),
        component: ({ onChange }) => (
          <GameVolatilitiesSelect
            isMulti
            inputLabel={t.get('volatility')}
            fullWidth
            onChange={(changedValue) => onChange('volatility', changedValue)}
          />
        )
      },
      {
        name: 'uILanguages',
        type: 'custom' as const,
        label: t.get('uILanguages'),
        component: ({ onChange }) => (
          <LanguageSelect
            isMulti
            inputLabel={t.get('uILanguages')}
            fullWidth
            onChange={(changedValue) => onChange('providerName', changedValue)}
          />
        )
      },
      {
        name: 'operatingLanguages',
        type: 'custom' as const,
        label: t.get('operatingLanguages'),
        component: ({ onChange }) => (
          <LanguageSelect
            isMulti
            inputLabel={t.get('operatingLanguages')}
            fullWidth
            onChange={(changedValue) => onChange('providerName', changedValue)}
          />
        )
      },
      //date picker is not finished
      {
        type: 'datepicker',
        name: 'creationDate',
        label: t.get('creationDate'),

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
          label: t.get('createdBy')
        }
      }
    ],
    [t]
  );

  const addGameButtonProps = useMemo(
    () => ({
      children: t.get('addGame'),
      startIcon: <Icons.PlusCircle />,
      onClick: () => redirectToURL(ROUTES.baseUrl + ROUTES.game + ROUTES.gameAdd)
    }),
    [t]
  );

  return (
    <PageWrapper title={t.get('games')} showButton buttonProps={addGameButtonProps}>
      <TablePage
        fetchData={onFiltersChange}
        isFetching={isFetching}
        isFilteredData={isFilteredData}
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
