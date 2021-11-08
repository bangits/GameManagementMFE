import { GetProviderRequestModel, GetProviderResponseModel, AddProviderRequestModel } from '../models';

export interface IProviderRepository {
  getProviders(getProviderRequestModel: GetProviderRequestModel): Promise<GetProviderResponseModel>;
  addProviders(getProviderRequestModel: AddProviderRequestModel): Promise<void>;
}
