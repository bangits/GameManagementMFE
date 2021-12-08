import { providerApi } from '@/adapter/redux/api';
import { GetProvidersViewModel, ProvidersFiltersViewModel } from '@/view/models';
import { SortTypesEnum, useFirstValue } from '@atom/common';
import { useMemo, useState } from 'react';
import ProviderList from './ProviderList';

const ProviderListContainer = () => {
  const filtersInitialValues = useMemo<ProvidersFiltersViewModel>(
    () => ({
      providerId: '',
      partnerId: '',
      providerName: '',
      currency: [],
      gameCount: {
        from: null,
        to: null
      },
      status: [],
      sorting: null,
      pagination: {
        page: 1,
        pageSize: 20
      }
    }),
    []
  );

  const [filters, setFilters] = useState<ProvidersFiltersViewModel>(filtersInitialValues);

  const { data, requestId } = providerApi.useGetProviderQuery(filters);

  const { results, rowCount } = (data || {}) as GetProvidersViewModel;

  const firstRequestId = useFirstValue(requestId);

  return (
    <>
      <ProviderList
        results={results || []}
        isFilteredData={firstRequestId !== requestId}
        rowCount={rowCount}
        filters={filters}
        onFiltersChange={(parameters) => {
          const sorting = parameters.sortedBy
            ? {
                direction: parameters.sortedBy.desc ? SortTypesEnum.DESC : SortTypesEnum.ASC,
                propertyId: parameters.sortedBy.id
              }
            : null;
          setFilters({
            ...filters,
            ...parameters.filters,
            sorting
          });
        }}
        filtersInitialValues={filtersInitialValues}
      />
    </>
  );
};

export default ProviderListContainer;
