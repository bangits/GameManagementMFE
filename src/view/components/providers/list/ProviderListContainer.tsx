import { providerApi } from '@/adapter/redux/api';
import { GetProviderResponseModel } from '@/domain/models';
import { GetProvidersViewModel } from '@/view/models';
import { SortTypesEnum } from '@atom/common';
import { useMemo, useState } from 'react';
import ProviderList from './ProviderList';

const ProviderContainer = () => {
  const [filters, setFilters] = useState<GetProvidersViewModel>({
    providerId: null,
    currency: null,
    gameCount: {
      from: null,
      to: null
    },
    status: [],
    sorting: null
  });

  const transformedFilters = useMemo(
    () => ({
      providerId: +filters.providerId || null,
      providerCurrenyIds: +filters.currency ? [+filters.currency] : [],
      gameCountFrom: +filters.gameCount.from || null,
      gameCountTo: +filters.gameCount.to || null,
      statusId: null,
      sorting: filters.sorting
    }),
    [filters]
  );

  const { data } = providerApi.useGetProviderQuery(transformedFilters);

  const { results } = data || ({} as GetProviderResponseModel);

  return (
    <>
      <ProviderList
        results={results || []}
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

export default ProviderContainer;
