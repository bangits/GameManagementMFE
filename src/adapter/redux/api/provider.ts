import { DI_CONSTANTS } from '@/di/constants';
import { ProviderUseCase } from '@/domain/use-case';
import {
  AddProviderViewModel,
  ChangeProviderFreeSpinSupportViewModel,
  ChangeProviderStatusViewModel,
  EditProviderGeneralInformationViewModel,
  GetProviderIntegrationTypesViewModel,
  GetProvidersByIdViewModel,
  ProviderGamesTypesViewModel,
  ProvidersFiltersViewModel,
  UpdateProviderLogoViewModel
} from '@/view/models';
import { ActionResponseModel, PrimaryKey } from '@atom/common';
import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../helpers';

export const providerApi = createApi({
  reducerPath: 'providerApi',
  baseQuery: createBaseQuery<ProviderUseCase>({ useCaseName: DI_CONSTANTS.PROVIDER.ProviderUseCase }),
  tagTypes: ['Providers', 'ProviderDetails'],
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
    changeProviderFreeSpinSupport: build.mutation<ActionResponseModel, ChangeProviderFreeSpinSupportViewModel>({
      query: (changeProviderFreeSpinSupportViewModel) => {
        return {
          methodName: 'changeProviderFreeSpinSupport',
          methodArguments: [changeProviderFreeSpinSupportViewModel]
        };
      },
      invalidatesTags: ['Providers']
    }),
    addProvider: build.mutation({
      query: (addProviderViewModel: AddProviderViewModel) => {
        return {
          methodName: 'addProvider',
          methodArguments: [addProviderViewModel]
        };
      },
      invalidatesTags: ['Providers']
    }),
    getProvidersById: build.query<GetProvidersByIdViewModel, {}>({
      query: (partnerId: PrimaryKey) => {
        return {
          methodName: 'getProvidersById',
          methodArguments: [partnerId]
        };
      },
      providesTags: ['ProviderDetails'],
      keepUnusedDataFor: 10
    }),
    getProviderGameTypesAndCount: build.query<ProviderGamesTypesViewModel[], {}>({
      query: (partnerId: PrimaryKey) => {
        return {
          methodName: 'getProviderGameTypesAndCount',
          methodArguments: [partnerId]
        };
      }
    }),
    getProviderIntegrationTypes: build.query<GetProviderIntegrationTypesViewModel, {}>({
      query: () => {
        return {
          methodName: 'getProviderIntegrationTypes',
          methodArguments: []
        };
      }
    }),
    editProviderGeneralInfo: build.mutation<ActionResponseModel, {}>({
      query: (editProviderGeneralInfoViewModel: EditProviderGeneralInformationViewModel) => {
        return {
          methodName: 'editProviderGeneralInfo',
          methodArguments: [editProviderGeneralInfoViewModel]
        };
      },
      invalidatesTags: ['ProviderDetails', 'Providers']
    }),
    updateProviderLogo: build.mutation<boolean, UpdateProviderLogoViewModel>({
      query: (updateProviderLogoViewModel: UpdateProviderLogoViewModel) => {
        return {
          methodName: 'updateProviderLogo',
          methodArguments: [updateProviderLogoViewModel]
        };
      },
      invalidatesTags: ['Providers']
    })
  })
});
