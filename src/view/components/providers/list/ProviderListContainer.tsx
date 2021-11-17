import { providerApi } from '@/adapter/redux/api';
import { GetProviderResponseModel } from '@/domain/models';
import { GetProvidersViewModel } from '@/view/models';
import { SortTypesEnum } from '@atom/common';
import { useMemo, useState } from 'react';
import ProviderList from './ProviderList';

const ProviderListContainer = () => {
  const [filters, setFilters] = useState<GetProvidersViewModel>({
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

  const transformedFilters = useMemo(
    () => ({
      providerName: filters.providerName || null,
      providerId: +filters.providerId || null,
      providerDefaultCurrencyIds: filters.currency ? filters.currency : [],
      gameCountFrom: +filters.gameCount.from || null,
      gameCountTo: +filters.gameCount.to || null,
      statusIds: filters.status,
      sorting: filters.sorting
    }),
    [filters]
  );

  const { data } = providerApi.useGetProviderQuery(transformedFilters);

  const { results, rowCount } = (data || {}) as GetProviderResponseModel;

  return (
    <>
      <ProviderList
        results={results || []}
        rowCount={rowCount}
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
        filters={filters}
      />
    </>
  );
};

export default ProviderListContainer;
