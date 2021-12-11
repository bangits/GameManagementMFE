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
        getVariantName: (value: string) => t.get(providerStatusesConfig[value].translationKey)
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
        translationKey: 'providers.statuses.inActive'
      },
      [ProviderStatusesEnum.Blocked]: {
        variant: 'blocked',
        translationKey: 'providers.statuses.blocked'
      },
      [ProviderStatusesEnum.Active]: {
        variant: 'active',
        translationKey: 'providers.statuses.active'
      },
      [ProviderStatusesEnum.Removed]: {
        variant: 'blocked',
        translationKey: 'providers.statuses.removed'
      }
    }),
    []
  );

  const filtersList = useMemo(
    () => [
      {
        label: t.get('providers.fields.providerId'),
        name: 'providerId',
        type: 'input' as const,
        props: {
          label: t.get('providers.fields.providerId')
        }
      },
      {
        label: t.get('providers.fields.partnerId'),
        name: 'partnerId',
        type: 'input' as const,
        props: {
          label: t.get('providers.fields.partnerId')
        }
      },
      {
        name: 'providerName',
        type: 'input' as const,
        label: t.get('providers.fields.providerName'),
        props: {
          label: t.get('providers.fields.providerName')
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
    <PageWrapper title={t.get('providers.list.title')}>
      <TablePage
        fetchData={onFiltersChange}
        isFilteredData={isFetching}
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
              tooltipText: t.get('providers.actions.activate')
            },
            {
              iconName: 'BlockButtonIcon',
              onClick: onInActivateButtonClick,
              shouldShow: shouldShowInActivateButton,
              tooltipText: t.get('providers.actions.inActivate')
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
              {t.get('providers.list.emptyResultFirstSentence')}
              <br />
              {t.get('providers.list.emptyResultSecondSentence')}
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
