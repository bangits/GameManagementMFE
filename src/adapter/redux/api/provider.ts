import { DI_CONSTANTS } from '@/di/constants';
import { AddProviderRequestModel } from '@/domain/models';
import { ProviderUseCase } from '@/domain/use-case';
import { ProvidersFiltersViewModel } from '@/view/models';
import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../helpers';

export const providerApi = createApi({
  reducerPath: 'providerApi',
  baseQuery: createBaseQuery<ProviderUseCase>({ useCaseName: DI_CONSTANTS.ProviderUseCase }),
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
      query: (addProviderRequestModel: AddProviderRequestModel) => {
        return {
          methodName: 'addProviders',
          methodArguments: [addProviderRequestModel]
        };
      }
    })
  })
});
