import { DI_CONSTANTS } from '@/di/constants';
import { ProviderUseCase } from '@/domain/use-case';
import {
  AddProviderViewModel,
  ChangeProviderStatusViewModel,
  GetProviderNamesViewModel,
  GetProvidersByIdViewModel,
  ProvidersFiltersViewModel
} from '@/view/models';
import { ActionResponseModel, PrimaryKey } from '@atom/common';
import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../helpers';

export const providerApi = createApi({
  reducerPath: 'providerApi',
  baseQuery: createBaseQuery<ProviderUseCase>({ useCaseName: DI_CONSTANTS.PROVIDER.ProviderUseCase }),
  tagTypes: ['Providers'],
  endpoints: (build) => ({
    getProvider: build.query({
      query: (providersFiltersViewModel: ProvidersFiltersViewModel) => {
        return {
          methodName: 'getProviders',
          methodArguments: [providersFiltersViewModel]
        };
      },
      providesTags: ['Providers']
    }),
    changeProviderStatus: build.mutation<ActionResponseModel, {}>({
      query: (changeProviderStatusViewModel: ChangeProviderStatusViewModel) => {
        return {
          methodName: 'changeProviderStatus',
          methodArguments: [changeProviderStatusViewModel]
        };
      },
      invalidatesTags: ['Providers']
    }),
    getProviderNames: build.query<GetProviderNamesViewModel, {}>({
      query: (isActive?) => {
        return {
          methodName: 'getProviderNames',
          methodArguments: [isActive]
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
