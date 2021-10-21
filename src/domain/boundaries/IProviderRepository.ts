import { GetProviderRequestModel, GetProviderResponseModel } from '../models';

export interface IProviderRepository {
  getProviders(getProviderRequestModel: GetProviderRequestModel): Promise<GetProviderResponseModel>;
}
