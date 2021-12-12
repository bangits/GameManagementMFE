import {
  AddProviderRequestModel,
  GetProviderNamesResponseModel,
  GetProviderRequestModel,
  GetProviderResponseModel
} from '../models';

export interface IProviderRepository {
  getProviders(getProviderRequestModel: GetProviderRequestModel): Promise<GetProviderResponseModel>;
  getProviderNames(isActive?): Promise<GetProviderNamesResponseModel>;
  addProviders(addProviderRequestModel: AddProviderRequestModel): Promise<boolean>;
}
