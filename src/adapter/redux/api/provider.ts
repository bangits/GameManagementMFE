import { DI_CONSTANTS } from '@/di/constants';
import { ProviderUseCase } from '@/domain/use-case';
import {
  AddProviderViewModel,
  ChangeProviderStatusViewModel,
  GetProviderNamesViewModel,
  ProvidersFiltersViewModel
} from '@/view/models';
import { ActionResponseModel } from '@atom/common';
import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../helpers';

export const providerApi = createApi({
  reducerPath: 'providerApi',
  baseQuery: createBaseQuery<ProviderUseCase>({ useCaseName: DI_CONSTANTS.PROVIDER.ProviderUseCase }),
  endpoints: (build) => ({
    getProvider: build.query({
      query: (providersFiltersViewModel: ProvidersFiltersViewModel) => {
        return {
          methodName: 'getProviders',
          methodArguments: [providersFiltersViewModel]
        };
      }
    }),
    changeProviderStatus: build.mutation<ActionResponseModel, {}>({
      query: (changeProviderStatusViewModel: ChangeProviderStatusViewModel) => {
        return {
          methodName: 'changeProviderStatus',
          methodArguments: [changeProviderStatusViewModel]
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
    })
  })
});
