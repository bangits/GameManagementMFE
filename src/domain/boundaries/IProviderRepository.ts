import { ActionResponseModel } from '@atom/common';
import {
  AddProviderRequestModel,
  ChangeProviderStatusRequestModel,
  GetProviderNamesResponseModel,
  GetProviderRequestModel,
  GetProviderResponseModel
} from '../models';

export interface IProviderRepository {
  getProviders(getProviderRequestModel: GetProviderRequestModel): Promise<GetProviderResponseModel>;
  getProviderNames(): Promise<GetProviderNamesResponseModel>;
  addProviders(addProviderRequestModel: AddProviderRequestModel): Promise<boolean>;
  changeProviderStatus(changeProviderStatus: ChangeProviderStatusRequestModel): Promise<ActionResponseModel>;
}
