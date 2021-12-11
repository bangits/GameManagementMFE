import { ActionResponseModel, PrimaryKey } from '@atom/common';
import {
  AddProviderRequestModel,
  ChangeProviderStatusRequestModel,
  GetProviderNamesResponseModel,
  GetProviderRequestModel,
  GetProviderResponseModel,
  GetProvidersByIdResponseModel
} from '../models';

export interface IProviderRepository {
  getProviders(getProviderRequestModel: GetProviderRequestModel): Promise<GetProviderResponseModel>;
  getProviderNames(): Promise<GetProviderNamesResponseModel>;
  addProviders(addProviderRequestModel: AddProviderRequestModel): Promise<boolean>;
  changeProviderStatus(changeProviderStatus: ChangeProviderStatusRequestModel): Promise<ActionResponseModel>;
  getProvidersById(providerId: PrimaryKey): Promise<GetProvidersByIdResponseModel>;
}
