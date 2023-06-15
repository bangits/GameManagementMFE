import { ProviderStatusesEnum } from '@/domain/models/enums';
import { FreeSpinPopover, ProviderIntegrationTypesSelect } from '@/view';
import { providerStatusesConfig } from '@/view/configs';
import { ROUTES } from '@/view/constants';
import { ProviderStatusesSortingEnum, ProvidersFiltersViewModel, ProvidersViewModel } from '@/view/models';
import { AuthenticatedContext } from '@atom/authorization';
import { ActionResponseModel, PageIdsEnum, PrimaryKey, TablePage, historyService, useTranslation } from '@atom/common';
import { FetchDataParameters, Icons, PageWrapper } from '@atom/design-system';
import { useContext, useMemo } from 'react';

export interface ProviderListProps {
  onFiltersChange: (parameters: FetchDataParameters<ProvidersViewModel, ProvidersFiltersViewModel>) => void;
  refetch: () => void;
  results: ProvidersViewModel[];
  rowCount: number;
  isFilteredData: boolean;
  isFirstResultEmpty: boolean;
  isFetching: boolean;
  filtersInitialValues: ProvidersFiltersViewModel;
  partnersTableLoadingIds: PrimaryKey[];
  providerName?: string;

  // actions
  onFreeSpinSupportChange: (providerIds: PrimaryKey[], hasFreeSpinSupport: boolean) => Promise<ActionResponseModel>;

  onActivateButtonClick: (column: ProvidersViewModel | ProvidersViewModel[]) => void;
  shouldShowActivateButton: (column: ProvidersViewModel) => boolean;

  onInActivateButtonClick: (column: ProvidersViewModel | ProvidersViewModel[]) => void;
  shouldShowInActivateButton: (column: ProvidersViewModel) => boolean;
}

function ProviderList({
  results,
  onFiltersChange,
  rowCount,
  isFilteredData,
  isFirstResultEmpty,
  filtersInitialValues,
  isFetching,
  onActivateButtonClick,
  shouldShowActivateButton,
  onInActivateButtonClick,
  shouldShowInActivateButton,
  partnersTableLoadingIds,
  refetch,
  onFreeSpinSupportChange,
  providerName
}: ProviderListProps) {
  const { user } = useContext(AuthenticatedContext);

  const t = useTranslation();

  const tableColumns = useMemo(
    () => [
      {
        Header: t.get('logo'),
        accessor: 'logo' as keyof ProvidersViewModel,
        disableSortBy: true,
        variant: 'hovered-image' as const
      },
      {
        Header: t.get('providerName'),
        accessor: 'providerName' as keyof ProvidersViewModel,
        sortingId: ProviderStatusesSortingEnum.PROVIDER_NAME
      },
      {
        Header: t.get('externalId'),
        accessor: 'externalId' as keyof ProvidersViewModel,
        sortingId: ProviderStatusesSortingEnum.EXTERNAL_ID
      },
      {
        Header: t.get('providerId'),
        accessor: 'providerId' as keyof ProvidersViewModel,
        sortingId: ProviderStatusesSortingEnum.ID
      },
      {
        Header: t.get('partnerId'),
        accessor: 'partnerId' as keyof ProvidersViewModel,
        sortingId: ProviderStatusesSortingEnum.PARTNER_ID
      },
      {
        Header: t.get('totalGameCount'),
        accessor: 'totalGameCount' as keyof ProvidersViewModel,
        sortingId: ProviderStatusesSortingEnum.GAME_COUNT
      },
      {
        Header: t.get('status'),
        accessor: 'status' as keyof ProvidersViewModel,
        variant: 'status' as const,
        getVariant: (value: string) => providerStatusesConfig[value].variant,
        getVariantName: (value: string) => t.get(providerStatusesConfig[value].translationKey),
        disableSortBy: true
      }
    ],
    [t]
  );

  const filtersList = useMemo(
    () => [
      {
        label: t.get('providerId'),
        name: 'providerId' as keyof ProvidersFiltersViewModel,
        type: 'input' as const,
        props: {
          label: t.get('providerId'),
          type: 'number'
        }
      },
      {
        label: t.get('partnerId'),
        name: 'partnerId' as keyof ProvidersFiltersViewModel,
        type: 'input' as const,
        props: {
          label: t.get('partnerId'),
          type: 'number'
        }
      },
      {
        name: 'providerName' as keyof ProvidersFiltersViewModel,
        type: 'input' as const,
        label: t.get('providerName'),
        props: {
          label: t.get('providerName'),
          disabled: !!providerName
        }
      },
      {
        name: 'integrationType' as keyof ProvidersFiltersViewModel,
        type: 'custom' as const,
        label: t.get('integrationType'),
        component: ({ onChange, filterValues }) => {
          return (
            <ProviderIntegrationTypesSelect
              inputLabel={t.get('IntegrationTypeId')}
              fullWidth
              selectAll
              value={filterValues.integrationTypeId}
              onChange={(changedValue) => onChange('integrationTypeId', changedValue)}
            />
          );
        }
      },
      {
        label: t.get('status'),
        name: 'status' as keyof ProvidersFiltersViewModel,
        type: 'select' as const,
        props: {
          selectAll: true,
          inputLabel: t.get('status'),
          selectAllLabel: t.get('all'),
          options: [
            { label: t.get('active'), value: ProviderStatusesEnum.Active },
            // { label: t.get('blocked'), value: ProviderStatusesEnum.Blocked },
            { label: t.get('inActive'), value: ProviderStatusesEnum.Inactive }
            // { label: t.get('removed'), value: ProviderStatusesEnum.Removed }
          ],
          isSearchable: true,
          isMulti: true
        }
      },
      {
        label: t.get('freeSpinApiSupport'),
        name: 'hasFreeSpin' as keyof ProvidersFiltersViewModel,
        type: 'truthly-select' as const,
        props: {
          inputLabel: t.get('freeSpinApiSupport')
        },
        translations: {
          trueValue: t.get('yes'),
          falseValue: t.get('no'),
          nullValue: t.get('all')
        }
      }
    ],
    [t]
  );

  const addProviderButtonProps = useMemo(
    () => ({
      children: t.get('add'),
      onClick: () => historyService.redirectToURL(ROUTES.baseUrl + ROUTES.providers + ROUTES.providersAdd)
    }),
    [t]
  );

  return (
    <PageWrapper title={t.get('providers')} showButton={!providerName} buttonProps={addProviderButtonProps}>
      <TablePage
        showFilters
        fetchData={onFiltersChange}
        isFilteredData={isFilteredData}
        isFetching={isFetching}
        isLoading={isFetching}
        refetch={refetch}
        tableBulkActions={[
          {
            component: (columns) => (
              <FreeSpinPopover
                onSubmit={(hasFreeSpinSupport) =>
                  onFreeSpinSupportChange(
                    columns.map((c) => c.providerId),
                    hasFreeSpinSupport
                  )
                }
              />
            ),
            shouldShow: () => true
          }
        ]}
        filterProps={{
          defaultOpened: false,
          initialValues: filtersInitialValues,
          filters: filtersList
        }}
        tableProps={{
          data: results,
          columns: tableColumns,
          loadingRowsIds: partnersTableLoadingIds,
          loadingRowColumnProperty: 'providerId',
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
          ],

          illustrationIcon: !isFirstResultEmpty ? <Icons.NoDataIcon /> : <Icons.EmptyDataIcon />,
          emptyText: !isFirstResultEmpty ? (
            <>
              {t.get('tables.emptyResultFirstSentence')}
              <br />
              {t.get('tables.emptyResultSecondSentence')}
            </>
          ) : (
            <>
              {t.get('youDontHaveProvidersAdded')}
              <br />
              {t.get('pleaseAddProvider')}
            </>
          )
        }}
        pageId={PageIdsEnum.PROVIDERS_PAGE}
        userId={user.userId}
        rowCount={rowCount}
        getEditUrl={(column) =>
          ROUTES.baseUrl +
          ROUTES.providers +
          ROUTES.providerDetails.replace(':providerId', column.providerId.toString()) +
          '/?isEdit=true'
        }
        getViewUrl={(column) =>
          ROUTES.baseUrl +
          ROUTES.providers +
          ROUTES.providerDetails.replace(':providerId', column.providerId.toString())
        }
      />
    </PageWrapper>
  );
}

export default ProviderList;
