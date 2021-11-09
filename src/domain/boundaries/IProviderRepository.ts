import { GetProviderNamesResponseModel, GetProviderRequestModel, GetProviderResponseModel } from '../models';

export interface IProviderRepository {
  getProviders(getProviderRequestModel: GetProviderRequestModel): Promise<GetProviderResponseModel>;
  getProviderNames(): Promise<GetProviderNamesResponseModel>;
}
