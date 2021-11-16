import { ProviderStatusesEnum } from '@/models';
import { CurrencySelect, redirectToURL, useTranslation } from '@atom/common';
import { DataTable, FetchDataParameters, Icons, PageWrapper } from '@atom/design-system';
import React, { useMemo } from 'react';
import { ProviderSelect } from '../..';

export interface ProviderListProps<T, K> {
  onFiltersChange: (parameters: FetchDataParameters<T, K>) => void;
  filters: K;
  results: T[];
  rowCount: number;
}

function ProviderList<T extends {}, K>({ filters, results, onFiltersChange, rowCount }: ProviderListProps<T, K>) {
  const tableColumns = useMemo(
    () => [
      {
        Header: 'Provider ID',
        accessor: 'id' as const
      },
      {
        Header: 'Logo',
        accessor: 'logo' as const,
        disableSortBy: true,
        variant: 'image' as const
      },
      {
        Header: 'Provider name',
        accessor: 'name' as const,
        sortingId: 'Name'
      },
      {
        Header: 'Total game count',
        accessor: 'gameCount' as const,
        sortingId: 'GameCount'
      },
      {
        Header: 'Default currency',
        accessor: 'defaultCurrency.code' as const,
        disableSortBy: true
      },
      {
        Header: 'Status',
        accessor: 'status.id' as const,
        disableSortBy: true,
        variant: 'status' as const,
        getVariant: (value: number) => (value === ProviderStatusesEnum.Active ? 'active' : 'blocked'),
        getVariantName: (value: number) => (value === ProviderStatusesEnum.Active ? 'Active' : 'Blocked')
      }
    ],
    []
  );
  const t = useTranslation();

  const filtersList = useMemo(
    () => [
      {
        name: 'providerName',
        type: 'custom' as const,
        label: t.get('provider.fields.providerName'),
        component: ({ onChange }) => (
          <ProviderSelect
            inputLabel='Provider Name'
            fullWidth
            onChange={(changedValue) => onChange('providerName', changedValue)}
          />
        )
      },
      {
        label: 'Provider ID',
        name: t.get('provider.fields.providerId'),
        type: 'input' as const,
        props: {
          label: 'Provider ID'
        }
      },
      {
        label: 'Game Count',
        type: 'from-to' as const,
        name: 'gameCount',
        fromInputProps: {
          label: t.get('provider.providerList.fields.gameCount.to'),
          type: 'number'
        },
        toInputProps: {
          label: t.get('provider.providerList.fields.gameCount.from'),
          type: 'number'
        }
      },
      {
        label: 'Default currency',
        name: 'currency',
        type: 'custom' as const,
        component: ({ onChange }) => (
          <CurrencySelect
            isMulti
            inputLabel={t.get('provider.providerList.fields.currency')}
            fullWidth
            onChange={(changedValue) => onChange('currency', changedValue)}
          />
        )
      },
      {
        label: 'Status',
        name: 'status',
        type: 'select' as const,
        props: {
          inputLabel: t.get('provider.providerList.fields.status'),
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
    []
  );


  return (
    <PageWrapper
      title={t.get('provider.providerList.title')}
      showButton
      buttonProps={{
        children: t.get('provider.addProvider'),
        startIcon: <Icons.PlusCircle />,
        onClick: () => redirectToURL('/game/providers/add')
      }}>
      <DataTable
        fetchData={onFiltersChange}
        filterProps={{
          defaultOpened: true,
          initialValues: filters,
          filters: filtersList,
          checkboxFilters: [],
          resultLabel: `${rowCount} ${t.get('provider.providerList.usersFound')}`,
          applyLabel: t.get('provider.applyLabel'),
          clearLabel: t.get('provider.clearLabel')
        }}
        tableProps={{
          data: results,
          columns: tableColumns
        }}
        onEditButtonClick={() => {}}
        onViewButtonClick={() => {}}
      />
    </PageWrapper>
  );
}

export default ProviderList;
