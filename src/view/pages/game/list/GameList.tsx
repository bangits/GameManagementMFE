import { GameStatusesEnum } from '@/domain/models';
import {
  FreeSpinPopover,
  GameClassSelect,
  GameFeaturesSelect,
  GamePlatformSelect,
  GameStatusesSelect,
  GameSupportedBrowsersSelect,
  GameThemesSelect,
  GameTypesSelect,
  GameVolatilitiesSelect,
  ProviderSelect
} from '@/view';
import { gameStatusesConfig } from '@/view/configs';
import { ROUTES } from '@/view/constants';
import { GameStatusesSortingEnum, GamesFiltersViewModel, GamesViewModel } from '@/view/models';
import { AuthenticatedContext } from '@atom/authorization';
import {
  ActionResponseModel,
  CountriesSelect,
  CurrencySelect,
  INPUT_MAX_VALUES,
  LanguageSelect,
  PageIdsEnum,
  PrimaryKey,
  TablePage,
  historyService,
  useTranslation
} from '@atom/common';
import { FetchDataParameters, Icons, PageWrapper } from '@atom/design-system';
import { useContext, useMemo } from 'react';
export interface GameListProps {
  onFiltersChange: (parameters: FetchDataParameters<GamesViewModel, GamesFiltersViewModel>) => void;
  refetch: () => void;
  filters: GamesFiltersViewModel;
  results: GamesViewModel[];
  rowCount: number;
  isFilteredData: boolean;
  isFirstResultEmpty: boolean;
  isFetching: boolean;
  gameTableLoadingIds: PrimaryKey[];
  providerId?: PrimaryKey;
  gameId?: PrimaryKey;

  // actions
  onFreeSpinSupportChange: (gameIds: PrimaryKey[], hasFreeSpinSupport: boolean) => Promise<ActionResponseModel>;

  onActivateButtonClick: (column: GamesViewModel | GamesViewModel[]) => void;
  shouldShowActivateButton: (column: GamesViewModel) => boolean;

  onInActivateButtonClick: (column: GamesViewModel | GamesViewModel[]) => void;
  shouldShowInActivateButton: (column: GamesViewModel) => boolean;
}

function GameList({
  filters,
  results,
  onFiltersChange,
  rowCount,
  isFilteredData,
  isFirstResultEmpty,
  isFetching,
  onActivateButtonClick,
  shouldShowActivateButton,
  onInActivateButtonClick,
  shouldShowInActivateButton,
  gameTableLoadingIds,
  refetch,
  providerId,
  gameId,
  onFreeSpinSupportChange
}: GameListProps) {
  const { user } = useContext(AuthenticatedContext);

  const t = useTranslation();

  const tableColumns = useMemo(
    () => [
      {
        Header: t.get('logo'),
        accessor: 'icon' as keyof GamesViewModel,
        variant: 'hovered-image' as const,
        disableSortBy: true
      },
      {
        Header: t.get('gameName'),
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
        Header: t.get('category'),
        accessor: 'category' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.CATEGORY,
        renderColumn: (_, v) => v?.name || t.get('emptyValue')
      },
      {
        Header: t.get('type'),
        accessor: 'type' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.TYPE,
        renderColumn: (_, v) => v?.name || t.get('emptyValue')
      },
      {
        Header: t.get('subtype'),
        accessor: 'subType' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.SUBTYPE,
        renderColumn: (_, v) => v?.name || t.get('emptyValue')
      },
      {
        Header: t.get('volatility'),
        accessor: 'volatilityName' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.VOLATILITY
      },
      {
        Header: t.get('rtp'),
        accessor: 'rtp' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.RTP
      },
      {
        Header: t.get('class'),
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
        Header: t.get('createdBy'),
        accessor: 'createdByUserEmail' as keyof GamesViewModel,
        sortingId: GameStatusesSortingEnum.CREATED_BY
      },
      {
        Header: t.get('status'),
        accessor: 'statusId' as keyof GamesViewModel,
        variant: 'status' as const,
        getVariant: (value: GameStatusesEnum) => gameStatusesConfig[value].variant,
        getVariantName: (value: GameStatusesEnum) => t.get(gameStatusesConfig[value].translationKey),
        disableSortBy: true
      }
    ],
    [t]
  );

  const filtersList = useMemo(
    () => [
      {
        name: 'gameId' as keyof GamesFiltersViewModel,
        type: 'input' as const,
        label: t.get('gameId'),

        props: {
          label: t.get('gameId'),
          maxLength: INPUT_MAX_VALUES.INPUT_FIELD,
          disabled: !!gameId,
          type: 'number'
        }
      },
      {
        name: 'externalId' as keyof GamesFiltersViewModel,
        type: 'input' as const,
        label: t.get('externalId'),
        props: {
          label: t.get('externalId'),
          maxLength: INPUT_MAX_VALUES.INPUT_FIELD
        }
      },
      {
        name: 'name' as keyof GamesFiltersViewModel,
        type: 'input' as const,
        label: t.get('gameName'),

        props: {
          label: t.get('gameName'),
          maxLength: INPUT_MAX_VALUES.INPUT_FIELD
        }
      },
      {
        name: 'providerIds' as keyof GamesFiltersViewModel,
        type: 'custom' as const,
        label: t.get('providerName'),
        component: ({ onChange, filterValues }) => (
          <ProviderSelect
            selectAll
            inputLabel={t.get('providerName')}
            fullWidth
            isMulti
            onChange={(changedValue) => onChange('providerIds', changedValue)}
            value={providerId ? (Array.isArray(providerId) ? providerId : [providerId]) : filterValues.providerIds}
            isDisabled={!!providerId}
          />
        )
      },
      {
        name: 'categoryIds' as keyof GamesFiltersViewModel,
        type: 'custom' as const,
        label: t.get('category'),
        component: ({ onChange, filterValues }) => (
          <GameTypesSelect
            selectAll
            fullWidth
            isMulti
            clearButton
            inputLabel={t.get('category')}
            onChange={(changedValue) => onChange('categoryIds', changedValue)}
            value={filterValues.categoryIds}
          />
        )
      },
      {
        name: 'typeIds' as keyof GamesFiltersViewModel,
        type: 'custom' as const,
        label: t.get('type'),
        component: ({ onChange, filterValues }) => (
          <GameTypesSelect
            selectAll
            fullWidth
            isMulti
            clearButton
            inputLabel={t.get('type')}
            isDisabled={!filterValues.categoryIds.length}
            gameTypeIds={filterValues.categoryIds}
            onChange={(changedValue) => onChange('typeIds', changedValue)}
            value={filterValues.typeIds}
          />
        )
      },
      {
        name: 'subTypeIds' as keyof GamesFiltersViewModel,
        type: 'custom' as const,
        label: t.get('subType'),
        component: ({ onChange, filterValues }) => (
          <GameTypesSelect
            selectAll
            fullWidth
            isMulti
            clearButton
            isDisabled={!filterValues.typeIds.length}
            gameTypeIds={filterValues.typeIds}
            inputLabel={t.get('subType')}
            value={filterValues.subTypeIds}
            onChange={(changedValue) => onChange('subTypeIds', changedValue)}
          />
        )
      },
      {
        label: t.get('rtp'),
        type: 'from-to' as const,
        name: 'rtp' as keyof GamesFiltersViewModel,

        fromInputProps: {
          label: t.get('rtpFrom'),
          maxLength: 7,
          type: 'number'
        },
        toInputProps: {
          label: t.get('rtpTo'),
          maxLength: 7,
          type: 'number'
        }
      },
      {
        type: 'datepicker' as const,
        name: 'releaseDate' as keyof GamesFiltersViewModel,
        label: t.get('releaseDate'),

        props: {
          selectsRange: true,
          monthsShown: 2
        }
      },
      {
        name: 'classIds' as keyof GamesFiltersViewModel,
        type: 'custom' as const,
        label: t.get('class'),

        component: ({ onChange, filterValues }) => (
          <GameClassSelect
            selectAll
            inputLabel={t.get('class')}
            fullWidth
            value={filterValues.classIds}
            isMulti
            onChange={(changedValue) => onChange('classIds', changedValue)}
          />
        )
      },
      {
        label: t.get('hasDemo'),
        name: 'hasDemo' as keyof GamesFiltersViewModel,
        type: 'truthly-select' as const,
        props: {
          inputLabel: t.get('hasDemo'),
          maxLength: INPUT_MAX_VALUES.INPUT_FIELD
        },
        translations: {
          trueValue: t.get('yes'),
          falseValue: t.get('no'),
          nullValue: t.get('all')
        }
      },
      {
        label: t.get('freeSpinApiSupport'),
        name: 'hasFreeSpin' as keyof GamesFiltersViewModel,
        type: 'truthly-select' as const,
        props: {
          inputLabel: t.get('freeSpinApiSupport')
        },
        translations: {
          trueValue: t.get('yes'),
          falseValue: t.get('no'),
          nullValue: t.get('all')
        }
      },
      {
        name: 'gameThemeIds' as keyof GamesFiltersViewModel,
        type: 'custom' as const,
        label: t.get('gameThemes'),

        component: ({ onChange, filterValues }) => (
          <GameThemesSelect
            selectAll
            inputLabel={t.get('gameThemes')}
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
        label: t.get('gameFeatures'),
        component: ({ onChange, filterValues }) => (
          <GameFeaturesSelect
            selectAll
            inputLabel={t.get('gameFeatures')}
            fullWidth
            isMulti
            value={filterValues.gameFeatureIds}
            onChange={(changedValue) => onChange('gameFeatureIds', changedValue)}
          />
        )
      },
      {
        name: 'gamePlatformIds' as keyof GamesFiltersViewModel,
        type: 'custom' as const,
        label: t.get('gameFeatures'),

        component: ({ onChange, filterValues }) => (
          <GamePlatformSelect
            selectAll
            inputLabel={t.get('gamePlatforms')}
            fullWidth
            isMulti
            value={filterValues.gamePlatformIds}
            onChange={(changedValue) => onChange('gamePlatformIds', changedValue)}
          />
        )
      },
      {
        name: 'gameCurrencyIds' as keyof GamesFiltersViewModel,
        type: 'custom' as const,
        label: t.get('supportedCurrencies'),
        component: ({ onChange, filterValues }) => (
          <CurrencySelect
            selectAll
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
        label: t.get('supportedBrowsers'),
        component: ({ onChange, filterValues }) => (
          <GameSupportedBrowsersSelect
            selectAll
            isMulti
            inputLabel={t.get('gameSupportedBrowserIds')}
            fullWidth
            value={filterValues.gameSupportedBrowserIds}
            onChange={(changedValue) => onChange('gameSupportedBrowserIds', changedValue)}
          />
        )
      },

      {
        name: 'gameCertifiedCountries' as keyof GamesFiltersViewModel,
        type: 'custom' as const,
        label: t.get('certifiedCountries'),
        component: ({ onChange, filterValues }) => (
          <CountriesSelect
            selectAll
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
        label: t.get('restrictedCountries'),
        component: ({ onChange, filterValues }) => (
          <CountriesSelect
            selectAll
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
        label: t.get('volatility'),
        component: ({ onChange, filterValues }) => (
          <GameVolatilitiesSelect
            selectAll
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
        label: t.get('uiLanguages'),
        component: ({ onChange, filterValues }) => (
          <LanguageSelect
            selectAll
            isMulti
            inputLabel={t.get('uiLanguages')}
            fullWidth
            value={filterValues.gameUiLanguageIds}
            onChange={(changedValue) => onChange('gameUiLanguageIds', changedValue)}
          />
        )
      },
      {
        name: 'gameOperatingLanguageIds' as keyof GamesFiltersViewModel,
        type: 'custom' as const,
        label: t.get('operatingLanguages'),
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
        type: 'timepicker-from-to' as const,
        label: t.get('creationDate'),
        name: 'creationDate' as keyof GamesFiltersViewModel,
        props: {
          selectsRange: true,
          monthsShown: 2
        },
        fromTimePickerProps: {
          placeholderText: t.get('creationDateFrom')
        },
        toTimePickerProps: {
          placeholderText: t.get('creationDateTo')
        }
      },

      {
        name: 'createdBy' as keyof GamesFiltersViewModel,
        type: 'input' as const,
        label: t.get('createdBy'),

        props: {
          label: t.get('createdBy'),
          maxLength: INPUT_MAX_VALUES.INPUT_FIELD_LARGE
        }
      },
      {
        name: 'statusIds' as keyof GamesFiltersViewModel,
        type: 'custom' as const,
        label: t.get('status'),

        component: ({ onChange, filterValues }) => (
          <GameStatusesSelect
            selectAll
            inputLabel={t.get('status')}
            fullWidth
            value={filterValues.statusIds}
            isMulti
            onChange={(changedValue) => onChange('statusIds', changedValue)}
          />
        )
      }
    ],
    [t, providerId]
  );

  const addGameButtonProps = useMemo(
    () => ({
      children: t.get('add'),
      onClick: () => historyService.redirectToURL(ROUTES.baseUrl + ROUTES.game + ROUTES.gameAdd)
    }),
    [t]
  );

  return (
    <PageWrapper title={t.get('games')} showButton={!providerId} buttonProps={addGameButtonProps}>
      <TablePage
        showFilters
        fetchData={onFiltersChange}
        isFetching={isFetching}
        isLoading={isFetching}
        isFilteredData={isFilteredData}
        refetch={refetch}
        filterProps={{
          defaultOpened: false,
          initialValues: filters,
          filters: filtersList
        }}
        tableBulkActions={[
          {
            component: (columns) => (
              <FreeSpinPopover
                onSubmit={(hasFreeSpinSupport) =>
                  onFreeSpinSupportChange(
                    columns.map((c) => c.gameId),
                    hasFreeSpinSupport
                  )
                }
              />
            ),
            shouldShow: () => true
          }
        ]}
        tableProps={{
          data: results,
          columns: tableColumns,
          illustrationIcon: !isFirstResultEmpty ? <Icons.NoDataIcon /> : <Icons.EmptyDataIcon />,
          emptyText: !isFirstResultEmpty ? (
            <>
              {t.get('tables.emptyResultFirstSentence')}
              <br />
              {t.get('tables.emptyResultSecondSentence')}
            </>
          ) : (
            <>
              {t.get('youDontHaveGameAdded')}
              <br />
              {t.get('pleaseAddGame')}
            </>
          ),
          loadingRowsIds: gameTableLoadingIds,
          loadingRowColumnProperty: 'gameId',
          actions: [
            {
              iconName: 'CheckButtonIcon',
              onClick: onActivateButtonClick,
              shouldShow: shouldShowActivateButton,
              tooltipText: t.get('activate')
            },
            {
              iconName: 'BlockButtonIcon',
              onClick: onInActivateButtonClick,
              shouldShow: shouldShowInActivateButton,
              tooltipText: t.get('inActivate')
            }
          ]
        }}
        pageId={PageIdsEnum.GAMES_PAGE}
        userId={user.userId}
        rowCount={rowCount}
        getEditUrl={(column) =>
          ROUTES.baseUrl +
          ROUTES.game +
          ROUTES.gameDetails.replace(':gameId', column.gameId.toString()) +
          '/?isEdit=true'
        }
        getViewUrl={(column) =>
          ROUTES.baseUrl + ROUTES.game + ROUTES.gameDetails.replace(':gameId', column.gameId.toString())
        }
      />
    </PageWrapper>
  );
}

export default GameList;
