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
import { GamesFiltersViewModel, GameStatusesSortingEnum, GamesViewModel } from '@/view/models';
import {
  CountriesSelect,
  CurrencySelect,
  INPUT_MAX_VALUES,
  LanguageSelect,
  redirectToURL,
  TablePage,
  useTranslation
} from '@atom/common';
import { FetchDataParameters, Icons, PageWrapper } from '@atom/design-system';
import { useMemo } from 'react';
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

  const tableColumns = useMemo(
    () => [
      {
        Header: t.get('logo'),
        accessor: 'logo' as keyof GamesViewModel,
        variant: 'image' as const
      },
      {
        Header: t.get('games.list.tableHeaders.gameName'),
        accessor: 'name' as keyof GamesViewModel,
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
        Header: t.get('games.list.tableHeaders.type'),
        accessor: 'typeName' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.TYPE
      },
      {
        Header: t.get('games.list.tableHeaders.subtype'),
        accessor: 'subTypeName' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.SUBTYPE
      },
      {
        Header: t.get('games.list.tableHeaders.volatility'),
        accessor: 'volatilityName' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.VOLATILITY
      },
      {
        Header: t.get('rtp'),
        accessor: 'rtp' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.RTP
      },
      {
        Header: t.get('games.list.tableHeaders.class'),
        accessor: 'className' as keyof GamesViewModel,
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
        Header: t.get('games.list.tableHeaders.createdBy'),
        accessor: 'createdByUserEmail' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.CREATED_BY
      },
      {
        Header: t.get('status'),
        accessor: 'status' as keyof GamesViewModel,
        variant: 'status' as const,
        getVariant: (value: number) => (value === GameStatusesEnum.Active ? 'active' : 'blocked'),
        getVariantName: (value: number) => (value === GameStatusesEnum.Active ? 'Active' : 'Blocked')
      }
    ],
    []
  );

  const filtersList = useMemo(
    () => [
      {
        name: 'gameId' as keyof GamesFiltersViewModel,
        type: 'input' as const,
        label: t.get('games.list.fields.gameId'),

        props: {
          label: t.get('gameId')
        }
      },

      {
        name: 'externalId' as keyof GamesFiltersViewModel,
        type: 'input' as const,
        label: t.get('games.list.fields.externalId'),

        props: {
          label: t.get('externalId')
        }
      },
      {
        name: 'name' as keyof GamesFiltersViewModel,
        type: 'input' as const,
        label: t.get('games.list.fields.gameName'),

        props: {
          label: t.get('gameName')
        }
      },

      {
        name: 'providerIds' as keyof GamesFiltersViewModel,
        type: 'custom' as const,
        label: t.get('games.list.fields.providerName'),
        component: ({ onChange, filterValues }) => (
          <ProviderSelect
            inputLabel={t.get('games.list.fields.providerName')}
            fullWidth
            isMulti
            onChange={(changedValue) => onChange('providerIds', changedValue)}
            value={filterValues.providerIds}
          />
        )
      },
      {
        name: 'type' as keyof GamesFiltersViewModel,
        type: 'custom' as const,
        label: t.get('games.list.fields.type'),
        component: ({ onChange, filterValues }) => (
          <GameTypesSelect
            inputLabel={t.get('type')}
            fullWidth
            onChange={(changedValue) => onChange('type', changedValue)}
            showAll
            value={filterValues.type}
          />
        )
      },
      {
        name: 'subTypeIds' as keyof GamesFiltersViewModel,
        type: 'custom' as const,
        label: t.get('games.list.fields.subType'),
        component: ({ onChange, filterValues }) => (
          <GameTypesSelect
            inputLabel={t.get('games.list.fields.subType')}
            fullWidth
            isMulti
            value={filterValues.subTypeIds}
            onChange={(changedValue) => onChange('subTypeIds', changedValue)}
            gameTypeId={filterValues.type}
          />
        )
      },
      {
        label: t.get('games.list.fields.rtp.title'),
        type: 'from-to' as const,
        name: 'rtp' as keyof GamesFiltersViewModel,
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
        type: 'datepicker' as const,
        name: 'releaseDate' as keyof GamesFiltersViewModel,
        label: t.get('games.list.fields.releaseDate'),
        props: {}
      },
      {
        name: 'classIds' as keyof GamesFiltersViewModel,
        type: 'custom' as const,
        label: t.get('games.list.fields.class'),

        component: ({ onChange, filterValues }) => (
          <GameClassSelect
            inputLabel={t.get('class')}
            fullWidth
            value={filterValues.classIds}
            isMulti
            onChange={(changedValue) => onChange('classIds', changedValue)}
          />
        )
      },
      {
        label: t.get('partners.fields.companyType'),
        name: 'hasDemo' as keyof GamesFiltersViewModel,
        type: 'truthly-select' as const,
        props: {
          inputLabel: t.get('games.list.fields.hasDemo.title'),
          maxLength: INPUT_MAX_VALUES.INPUT_FIELD
        },
        translations: {
          trueValue: t.get('games.list.fields.hasDemo.yes'),
          falseValue: t.get('games.list.fields.hasDemo.no'),
          nullValue: t.get('form.all')
        }
      },
      {
        name: 'gameThemeIds' as keyof GamesFiltersViewModel,
        type: 'custom' as const,
        label: t.get('games.list.fields.gameThemes'),

        component: ({ onChange, filterValues }) => (
          <GameThemesSelect
            inputLabel={t.get('games.list.fields.gameThemes')}
            fullWidth
            isMulti
            value={filterValues.gameThemeIds}
            onChange={(changedValue) => onChange('gameThemeIds', changedValue)}
          />
        )
      },
      {
        name: 'gameFeatureIds' as keyof GamesFiltersViewModel,
        type: 'custom' as const,
        label: t.get('games.list.fields.gameFeatures'),

        component: ({ onChange, filterValues }) => (
          <GameFeaturesSelect
            inputLabel={t.get('games.list.fields.gameFeatures')}
            fullWidth
            isMulti
            value={filterValues.gameFeatureIds}
            onChange={(changedValue) => onChange('gameFeatureIds', changedValue)}
          />
        )
      },
      // {
      //   label: t.get('game.fields.list.device'),
      //   name: 'device' as keyof GamesFiltersViewModel,
      //   type: 'truthly-select' as const,
      //   props: {
      //     inputLabel: t.get('games.list.fields.devices.title'),
      //     maxLength: INPUT_MAX_VALUES.INPUT_FIELD
      //   },
      //   translations: {
      //     trueValue: t.get('games.list.fields.devices.mobile'),
      //     falseValue: t.get('games.list.fields.devices.tablet'),
      //     nullValue: t.get('form.all')
      //   }
      // },
      {
        name: 'gameCurrencyIds' as keyof GamesFiltersViewModel,
        type: 'custom' as const,
        label: t.get('games.list.fields.supportedCurrencies'),
        component: ({ onChange, filterValues }) => (
          <CurrencySelect
            isMulti
            inputLabel={t.get('supportedCurrencies')}
            fullWidth
            value={filterValues.gameCurrencyIds}
            onChange={(changedValue) => onChange('gameCurrencyIds', changedValue)}
          />
        )
      },
      {
        name: 'gameSupportedBrowserIds' as keyof GamesFiltersViewModel,
        type: 'custom' as const,
        label: t.get('games.list.fields.supportedBrowsers'),
        component: ({ onChange, filterValues }) => (
          <GameSupportedBrowsersSelect
            isMulti
            inputLabel={t.get('games.list.fields.gameSupportedBrowserIds')}
            fullWidth
            value={filterValues.gameSupportedBrowserIds}
            onChange={(changedValue) => onChange('gameSupportedBrowserIds', changedValue)}
          />
        )
      },

      {
        name: 'gameCertifiedCountries' as keyof GamesFiltersViewModel,
        type: 'custom' as const,
        label: t.get('games.list.fields.certifiedCountries'),
        component: ({ onChange, filterValues }) => (
          <CountriesSelect
            isMulti
            inputLabel={t.get('certifiedCountries')}
            fullWidth
            value={filterValues.gameCertifiedCountries}
            onChange={(changedValue) => onChange('gameCertifiedCountries', changedValue)}
          />
        )
      },
      {
        name: 'gameRestrictedCountryIds' as keyof GamesFiltersViewModel,
        type: 'custom' as const,
        label: t.get('games.list.fields.restrictedCountries'),
        component: ({ onChange, filterValues }) => (
          <CountriesSelect
            isMulti
            inputLabel={t.get('restrictedCountries')}
            fullWidth
            value={filterValues.gameRestrictedCountryIds}
            onChange={(changedValue) => onChange('gameRestrictedCountryIds', changedValue)}
          />
        )
      },
      {
        name: 'volatilityIds' as keyof GamesFiltersViewModel,
        type: 'custom' as const,
        label: t.get('games.list.fields.volatility'),
        component: ({ onChange, filterValues }) => (
          <GameVolatilitiesSelect
            isMulti
            inputLabel={t.get('volatility')}
            fullWidth
            value={filterValues.volatilityIds}
            onChange={(changedValue) => onChange('volatilityIds', changedValue)}
          />
        )
      },
      {
        name: 'gameUiLanguageIds' as keyof GamesFiltersViewModel,
        type: 'custom' as const,
        label: t.get('games.list.fields.uILanguages'),
        component: ({ onChange, filterValues }) => (
          <LanguageSelect
            isMulti
            inputLabel={t.get('uILanguages')}
            fullWidth
            value={filterValues.gameUiLanguageIds}
            onChange={(changedValue) => onChange('gameUiLanguageIds', changedValue)}
          />
        )
      },
      {
        name: 'gameOperatingLanguageIds' as keyof GamesFiltersViewModel,
        type: 'custom' as const,
        label: t.get('games.list.fields.operatingLanguages'),
        component: ({ onChange, filterValues }) => (
          <LanguageSelect
            isMulti
            inputLabel={t.get('operatingLanguages')}
            fullWidth
            value={filterValues.gameOperatingLanguageIds}
            onChange={(changedValue) => onChange('gameOperatingLanguageIds', changedValue)}
          />
        )
      },
      {
        type: 'datepicker' as const,
        name: 'creationDate' as keyof GamesFiltersViewModel,
        label: t.get('games.list.fields.creationDate'),

        props: {
          selectsRange: true,
          monthsShown: 2
        }
      },
      {
        name: 'createdBy' as keyof GamesFiltersViewModel,
        type: 'input' as const,
        label: t.get('games.list.fields.createdBy'),

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
          defaultOpened: false,
          initialValues: filters,
          filters: filtersList
        }}
        tableProps={{
          data: results,
          columns: tableColumns,
          illustrationIcon: isFilteredData ? <Icons.NoDataIcon /> : <Icons.EmptyDataIcon />,
          emptyText: isFilteredData
            ? t.get('common.tables.emptyResultSecondSentence')
            : t.get('games.list.resultNotFound')
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
