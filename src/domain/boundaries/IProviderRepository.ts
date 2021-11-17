import {
  AddProviderRequestModel,
  GetProviderNamesResponseModel,
  GetProviderRequestModel,
  GetProviderResponseModel
} from '../models';

export interface IProviderRepository {
  getProviders(getProviderRequestModel: Partial<GetProviderRequestModel>): Promise<GetProviderResponseModel>;
  getProviderNames(): Promise<GetProviderNamesResponseModel>;

  addProviders(getProviderRequestModel: AddProviderRequestModel): Promise<boolean>;
}
