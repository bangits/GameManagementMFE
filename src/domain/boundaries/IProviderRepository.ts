import { ActionResponseModel, PrimaryKey } from '@atom/common';
import {
  AddProviderRequestModel,
  ChangeProviderStatusRequestModel,
  GetGameTypesAndCountResponseModel,
  GetProviderNamesResponseModel,
  GetProviderRequestModel,
  GetProviderResponseModel,
  GetProvidersByIdResponseModel
} from '../models';

export interface IProviderRepository {
  getProviders(getProviderRequestModel: GetProviderRequestModel): Promise<GetProviderResponseModel>;
  getProviderNames(isActive?: boolean): Promise<GetProviderNamesResponseModel>;
  addProviders(addProviderRequestModel: AddProviderRequestModel): Promise<boolean>;
  changeProviderStatus(changeProviderStatus: ChangeProviderStatusRequestModel): Promise<ActionResponseModel>;
  getProvidersById(providerId: PrimaryKey): Promise<GetProvidersByIdResponseModel>;
  getProviderGameTypesAndCount(providerId: PrimaryKey): Promise<GetGameTypesAndCountResponseModel[]>;
}
