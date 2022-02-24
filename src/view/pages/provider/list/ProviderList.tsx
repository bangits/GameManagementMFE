import { ProviderStatusesEnum } from '@/domain/models/enums';
import { ProviderIntegrationTypesSelect } from '@/view';
import { providerStatusesConfig } from '@/view/configs';
import { ROUTES } from '@/view/constants';
import { ProvidersFiltersViewModel, ProviderStatusesSortingEnum, ProvidersViewModel } from '@/view/models';
import { AuthenticatedContext } from '@atom/authorization';
import { historyService, PageIdsEnum, PrimaryKey, TablePage, useTranslation } from '@atom/common';
import { FetchDataParameters, Icons, PageWrapper } from '@atom/design-system';
import { useContext, useMemo } from 'react';

export interface ProviderListProps {
  onFiltersChange: (parameters: FetchDataParameters<ProvidersViewModel, ProvidersFiltersViewModel>) => void;
  refetch: () => void;
  results: ProvidersViewModel[];
  rowCount: number;
  isFilteredData: boolean;
  isFetching: boolean;
  filtersInitialValues: ProvidersFiltersViewModel;
  partnersTableLoadingIds: PrimaryKey[];

  // actions
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
  filtersInitialValues,
  isFetching,
  onActivateButtonClick,
  shouldShowActivateButton,
  onInActivateButtonClick,
  shouldShowInActivateButton,
  partnersTableLoadingIds,
  refetch
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
        name: 'providerId' as keyof ProvidersViewModel,
        type: 'input' as const,
        props: {
          label: t.get('providerId'),
          type: 'number'
        }
      },
      {
        label: t.get('partnerId'),
        name: 'partnerId' as keyof ProvidersViewModel,
        type: 'input' as const,
        props: {
          label: t.get('partnerId'),
          type: 'number'
        }
      },
      {
        name: 'providerName' as keyof ProvidersViewModel,
        type: 'input' as const,
        label: t.get('providerName'),
        props: {
          label: t.get('providerName')
        }
      },
      {
        name: 'integrationType' as keyof ProvidersViewModel,
        type: 'custom' as const,
        label: t.get('integrationTypeName'),
        component: ({ onChange, filterValues }) => {
          console.log(filterValues);
          return (
            <ProviderIntegrationTypesSelect
              inputLabel={t.get('IntegrationTypeId')}
              fullWidth
              value={filterValues.integrationTypeId}
              onChange={(changedValue) => onChange('integrationTypeId', changedValue)}
            />
          );
        }
      },
      {
        label: t.get('status'),
        name: 'status',
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
    <PageWrapper title={t.get('providers')} showButton buttonProps={addProviderButtonProps}>
      <TablePage
        showFilters
        fetchData={onFiltersChange}
        isFilteredData={isFilteredData}
        isFetching={isFetching}
        isLoading={isFetching}
        refetch={refetch}
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

          illustrationIcon: isFilteredData ? <Icons.NoDataIcon /> : <Icons.EmptyDataIcon />,
          emptyText: isFilteredData ? (
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
