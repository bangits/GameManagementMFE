import { providerApi } from '@/adapter/redux/api';
import { GetProviderResponseModel } from '@/domain/models';
import { GetProvidersViewModel } from '@/view/models';
import { useState } from 'react';
import ProviderList from './ProviderList';

const ProviderContainer = () => {
  const [filters, setFilters] = useState<GetProvidersViewModel>({
    providerId: null,
    currency: null,
    gameCount: {
      from: null,
      to: null
    },
    status: []
  });

  const { data } = providerApi.useGetProviderQuery({
    providerId: filters.providerId,
    providerCurrenyIds: [filters.currency],
    gameCountFrom: filters.gameCount.from,
    gameCountTo: filters.gameCount.to,
    statusId: null
  });

  const { results } = data || ({} as GetProviderResponseModel);

  return (
    <>
      <ProviderList
        results={results || []}
        onFiltersChange={(parameters) => {
          const sorting = parameters.sortedBy
            ? {
                direction: parameters.sortedBy.desc ? 1 : 0,
                property: parameters.sortedBy.id
              }
            : {};

          setFilters({
            ...filters,
            ...parameters.filters,
            ...sorting
          });
        }}
        filters={filters}
      />
    </>
  );
};

export default ProviderContainer;
