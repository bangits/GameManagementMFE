import {
  AddProviderRequestModel,
  GetProviderNamesResponseModel,
  GetProviderRequestModel,
  GetProviderResponseModel
} from '../models';

export interface IProviderRepository {
  getProviders(getProviderRequestModel: GetProviderRequestModel): Promise<GetProviderResponseModel>;
  getProviderNames(): Promise<GetProviderNamesResponseModel>;

  addProviders(addProviderRequestModel: AddProviderRequestModel): Promise<boolean>;
}
