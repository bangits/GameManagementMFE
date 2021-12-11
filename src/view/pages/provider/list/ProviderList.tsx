import { ProviderStatusesEnum } from '@/domain/models/enums';
import { ProvidersFiltersViewModel, ProviderStatusesSortingEnum, ProvidersViewModel } from '@/view/models';
import { PrimaryKey, TablePage, useTranslation } from '@atom/common';
import { FetchDataParameters, Icons, PageWrapper } from '@atom/design-system';
import { useMemo } from 'react';

export interface ProviderListProps {
  onFiltersChange: (parameters: FetchDataParameters<ProvidersViewModel, ProvidersFiltersViewModel>) => void;
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
  partnersTableLoadingIds
}: ProviderListProps) {
  const tableColumns = useMemo(
    () => [
      {
        Header: 'Logo',
        accessor: 'logo',
        disableSortBy: true,
        variant: 'image' as const
      },
      {
        Header: 'Provider name',
        accessor: 'providerName',
        sortingId: ProviderStatusesSortingEnum.PROVIDER_NAME
      },
      {
        Header: 'Provider ID',
        accessor: 'providerId',
        sortingId: ProviderStatusesSortingEnum.ID
      },
      {
        Header: 'Partner ID',
        accessor: 'partnerId',
        sortingId: ProviderStatusesSortingEnum.PARTNER_ID
      },
      {
        Header: 'Total game count',
        accessor: 'totalGameCount',
        sortingId: ProviderStatusesSortingEnum.GAME_COUNT
      },

      {
        Header: 'Status',
        accessor: 'status',
        variant: 'status' as const,
        getVariant: (value: string) => providerStatusesConfig[value].variant,
        getVariantName: (value: string) => t.get(providerStatusesConfig[value].translationKey),
        disableSortBy: true
      }
    ],
    []
  );

  const t = useTranslation();

  const providerStatusesConfig = useMemo<
    Record<ProviderStatusesEnum, { variant: 'active' | 'inactive' | 'blocked'; translationKey: string }>
  >(
    () => ({
      [ProviderStatusesEnum.Inactive]: {
        variant: 'inactive',
        translationKey: 'inActive'
      },
      [ProviderStatusesEnum.Blocked]: {
        variant: 'blocked',
        translationKey: 'blocked'
      },
      [ProviderStatusesEnum.Active]: {
        variant: 'active',
        translationKey: 'active'
      },
      [ProviderStatusesEnum.Removed]: {
        variant: 'blocked',
        translationKey: 'removed'
      }
    }),
    []
  );

  const filtersList = useMemo(
    () => [
      {
        label: t.get('providerId'),
        name: 'providerId',
        type: 'input' as const,
        props: {
          label: t.get('providerId')
        }
      },
      {
        label: t.get('partnerId'),
        name: 'partnerId',
        type: 'input' as const,
        props: {
          label: t.get('partnerId')
        }
      },
      {
        name: 'providerName',
        type: 'input' as const,
        label: t.get('providerName'),
        props: {
          label: t.get('providerName')
        }
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
            { label: t.get('statuses.active'), value: ProviderStatusesEnum.Active },
            { label: t.get('statuses.blocked'), value: ProviderStatusesEnum.Blocked },
            { label: t.get('statuses.inActive'), value: ProviderStatusesEnum.Inactive },
            { label: t.get('statuses.removed'), value: ProviderStatusesEnum.Removed }
          ],
          isSearchable: true,
          isMulti: true
        }
      }
    ],
    [t]
  );

  return (
    <PageWrapper title={t.get('providers')}>
      <TablePage
        fetchData={onFiltersChange}
        isFilteredData={isFilteredData}
        isFetching={isFetching}
        filterProps={{
          defaultOpened: true,
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

export default ProviderList;
