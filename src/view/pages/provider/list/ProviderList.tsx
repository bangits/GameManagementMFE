import { ProviderStatusesEnum } from '@/domain/models/enums';
import { ProviderSelect } from '@/view';
import { ProvidersFiltersViewModel, ProviderStatusesSortingEnum, ProvidersViewModel } from '@/view/models';
import { TablePage, useTranslation } from '@atom/common';
import { FetchDataParameters, Icons, PageWrapper } from '@atom/design-system';
import { useMemo } from 'react';

export interface ProviderListProps {
  onFiltersChange: (parameters: FetchDataParameters<ProvidersViewModel, ProvidersFiltersViewModel>) => void;
  results: ProvidersViewModel[];
  rowCount: number;
  isFilteredData: boolean;
  filtersInitialValues: ProvidersFiltersViewModel;
}

function ProviderList({ results, onFiltersChange, rowCount, isFilteredData, filtersInitialValues }: ProviderListProps) {
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
        type: 'custom' as const,
        label: t.get('providers.fields.providerName'),
        component: ({ onChange }) => (
          <ProviderSelect
            inputLabel={t.get('providers.fields.providerName')}
            fullWidth
            onChange={(changedValue) => onChange('providerName', changedValue)}
          />
        )
      },

      // {
      //   label: t.get('providers.fields.gameCount'),
      //   type: 'from-to' as const,
      //   name: 'gameCount',
      //   fromInputProps: {
      //     label: t.get('providers.fields.gameCountFrom'),
      //     type: 'number'
      //   },
      //   toInputProps: {
      //     label: t.get('providers.fields.gameCountTo'),
      //     type: 'number'
      //   }
      // },
      // {
      //   label: t.get('providers.fields.defaultCurrency'),
      //   name: 'currency',
      //   type: 'custom' as const,
      //   component: ({ onChange }) => (
      //     <CurrencySelect
      //       isMulti
      //       inputLabel={t.get('providers.fields.defaultCurrency')}
      //       fullWidth
      //       onChange={(changedValue) => onChange('currency', changedValue)}
      //     />
      //   )
      // },
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
        filterProps={{
          defaultOpened: true,
          initialValues: filtersInitialValues,
          filters: filtersList
        }}
        tableProps={{
          data: results,
          columns: tableColumns,
          actions: [],

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
