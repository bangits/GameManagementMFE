import { ProviderStatusesEnum } from '@/domain/models/enums';
import { ProviderSelect } from '@/view';
import { ROUTES } from '@/view/constants';
import { ProvidersFiltersViewModel, ProvidersViewModel } from '@/view/models';
import { CurrencySelect, redirectToURL, TablePage, useTranslation } from '@atom/common';
import { FetchDataParameters, Icons, PageWrapper } from '@atom/design-system';
import { useMemo } from 'react';
export interface ProviderListProps {
  onFiltersChange: (parameters: FetchDataParameters<ProvidersViewModel, ProvidersFiltersViewModel>) => void;
  filters: ProvidersFiltersViewModel;
  results: ProvidersViewModel[];
  rowCount: number;
}

function ProviderList({ filters, results, onFiltersChange, rowCount }: ProviderListProps) {
  const tableColumns = useMemo(
    () => [
      {
        Header: 'Provider ID',
        accessor: 'providerId' as keyof ProvidersViewModel
      },
      {
        Header: 'Logo',
        accessor: 'logo' as keyof ProvidersViewModel,
        disableSortBy: true,
        variant: 'image' as const
      },
      {
        Header: 'Provider name',
        accessor: 'providerName' as keyof ProvidersViewModel,
        sortingId: 'Name'
      },
      {
        Header: 'Total game count',
        accessor: 'totalGameCount' as keyof ProvidersViewModel,
        sortingId: 'GameCount'
      },
      {
        Header: 'Default currency',
        accessor: 'defaultCurrency' as keyof ProvidersViewModel,
        disableSortBy: true
      },
      {
        Header: 'Status',
        accessor: 'status' as keyof ProvidersViewModel,
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
        label: t.get('providers.fields.providerName'),
        component: ({ onChange }) => (
          <ProviderSelect
            inputLabel={t.get('providers.fields.providerName')}
            fullWidth
            onChange={(changedValue) => onChange('providerName', changedValue)}
          />
        )
      },
      {
        label: t.get('providers.fields.providerId'),
        name: 'providerId',
        type: 'input' as const,
        props: {
          label: t.get('providers.fields.providerId')
        }
      },
      {
        label: t.get('providers.fields.gameCount'),
        type: 'from-to' as const,
        name: 'gameCount',
        fromInputProps: {
          label: t.get('providers.fields.gameCountFrom'),
          type: 'number'
        },
        toInputProps: {
          label: t.get('providers.fields.gameCountTo'),
          type: 'number'
        }
      },
      {
        label: t.get('providers.fields.defaultCurrency'),
        name: 'currency',
        type: 'custom' as const,
        component: ({ onChange }) => (
          <CurrencySelect
            isMulti
            inputLabel={t.get('providers.fields.defaultCurrency')}
            fullWidth
            onChange={(changedValue) => onChange('currency', changedValue)}
          />
        )
      },
      {
        label: t.get('statuses.name'),
        name: 'status',
        type: 'select' as const,
        props: {
          inputLabel: t.get('statuses.name'),
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

  const addProviderButtonProps = useMemo(
    () => ({
      children: t.get('providers.list.addProviderButton'),
      startIcon: <Icons.PlusCircle />,
      onClick: () => redirectToURL(ROUTES.baseUrl + ROUTES.providers + ROUTES.providersAdd)
    }),
    [t]
  );

  return (
    <PageWrapper title={t.get('providers.list.title')} showButton buttonProps={addProviderButtonProps}>
      <TablePage
        fetchData={onFiltersChange}
        filterProps={{
          defaultOpened: true,
          initialValues: filters,
          filters: filtersList
          // checkboxFilters: []
        }}
        tableProps={{
          // @ts-expect-error Disabled typescript, because ObjectMock[] is ProvidersViewModel[]
          data: results,
          columns: tableColumns
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
