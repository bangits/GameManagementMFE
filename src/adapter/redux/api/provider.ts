import { GetProviderRequestModel } from '@/domain/models/request/GetProviderRequestModel';
import { AddProviderRequestModel } from './../../../domain/models/request/AddProviderRequestModel';
import { ProviderUseCase } from '@/domain/use-case/ProviderUseCase';
import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../helpers';

export const providerApi = createApi({
  reducerPath: 'providerApi',
  baseQuery: createBaseQuery<ProviderUseCase>({ useCaseName: 'ProviderUseCase' }),
  endpoints: (build) => ({
    getProvider: build.query({
      query: (getProviderRequestModel: GetProviderRequestModel) => {
        return {
          methodName: 'getProviders',
          methodArguments: [getProviderRequestModel]
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
