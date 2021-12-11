import { DI_CONSTANTS } from '@/di/constants';
import { ProviderUseCase } from '@/domain/use-case';
import {
  AddProviderViewModel,
  GetProviderNamesViewModel,
  GetProvidersByIdViewModel,
  ProvidersFiltersViewModel
} from '@/view/models';
import { PrimaryKey } from '@atom/common';
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
    getProviderNames: build.query<GetProviderNamesViewModel, {}>({
      query: () => {
        return {
          methodName: 'getProviderNames',
          methodArguments: []
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
    }),
    getProvidersById: build.query<GetProvidersByIdViewModel, {}>({
      query: (partnerId: PrimaryKey) => {
        return {
          methodName: 'getProvidersById',
          methodArguments: [partnerId]
        };
      }
    })
  })
});
