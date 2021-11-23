import { providerApi } from '@/adapter/redux/api';
import { GetProvidersViewModel, ProvidersFiltersViewModel } from '@/view/models';
import { SortTypesEnum } from '@atom/common';
import { useState } from 'react';
import ProviderList from './ProviderList';

const ProviderListContainer = () => {
  const [filters, setFilters] = useState<ProvidersFiltersViewModel>({
    providerId: null,
    providerName: null,
    currency: [],
    gameCount: {
      from: null,
      to: null
    },
    status: [],
    sorting: null
  });

  const { data } = providerApi.useGetProviderQuery(filters);

  const { results, rowCount } = (data || {}) as GetProvidersViewModel;

  return (
    <>
      <ProviderList
        results={results || []}
        rowCount={rowCount}
        filters={filters}
        onFiltersChange={(parameters) => {
          const sorting = parameters.sortedBy
            ? {
                direction: parameters.sortedBy.desc ? SortTypesEnum.DESC : SortTypesEnum.ASC,
                property: parameters.sortedBy.id
              }
            : null;

          setFilters({
            ...filters,
            ...parameters.filters,
            sorting
          });
        }}
      />
    </>
  );
};

export default ProviderListContainer;
