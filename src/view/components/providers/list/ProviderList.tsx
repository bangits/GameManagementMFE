import { ProviderStatusesEnum } from '@/models';
import { CurrencySelect, redirectToURL } from '@atom/common';
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

  const filtersList = useMemo(
    () => [
      {
        name: 'providerName',
        type: 'custom' as const,
        label: 'Provider Name',
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
        name: 'providerId',
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
          label: 'Game Count - From',
          type: 'number'
        },
        toInputProps: {
          label: 'Game Count - To',
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
            inputLabel='Default currency'
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
          inputLabel: 'Status',
          options: [
            { label: 'Active', value: ProviderStatusesEnum.Active },
            { label: 'Blocked', value: ProviderStatusesEnum.Blocked },
            { label: 'Inactive', value: ProviderStatusesEnum.Inactive },
            { label: 'Removed', value: ProviderStatusesEnum.Removed }
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
      title='Providers'
      showButton
      buttonProps={{
        children: 'Add Provider',
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
          resultLabel: `${rowCount} users found`,
          applyLabel: 'Apply',
          clearLabel: 'Clear'
        }}
        tableProps={{
          data: results,
          columns: tableColumns
        }}
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
