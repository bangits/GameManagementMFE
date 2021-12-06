import { DI_CONSTANTS } from '@/di/constants';
import { ProviderUseCase } from '@/domain/use-case';
import { AddProviderViewModel, ProvidersFiltersViewModel } from '@/view/models';
import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../helpers';

export const providerApi = createApi({
  reducerPath: 'providerApi',
  baseQuery: createBaseQuery<ProviderUseCase>({ useCaseName: DI_CONSTANTS.PROVIDER.ProviderUseCase }),
  endpoints: (build) => ({
    getProvider: build.query({
      query: (ProvidersFiltersViewModel: ProvidersFiltersViewModel) => {
        return {
          methodName: 'getProviders',
          methodArguments: [ProvidersFiltersViewModel]
        };
      }
    }),
    addProvider: build.mutation({
      query: (addProviderViewModel: AddProviderViewModel) => {
        return {
          methodName: 'addProviders',
          methodArguments: [addProviderViewModel]
        };
      }
    })
  })
});
