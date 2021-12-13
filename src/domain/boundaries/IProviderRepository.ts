import { ActionResponseModel, PrimaryKey } from '@atom/common';
import {
  AddProviderRequestModel,
  ChangeProviderStatusRequestModel,
  GetProviderByPartnerIdResponseModel,
  GetProviderNamesResponseModel,
  GetProviderRequestModel,
  GetProviderResponseModel,
  GetProvidersByIdResponseModel
} from '../models';

export interface IProviderRepository {
  getProviders(getProviderRequestModel: GetProviderRequestModel): Promise<GetProviderResponseModel>;
  getProviderNames(isActive?): Promise<GetProviderNamesResponseModel>;
  addProviders(addProviderRequestModel: AddProviderRequestModel): Promise<boolean>;
  changeProviderStatus(changeProviderStatus: ChangeProviderStatusRequestModel): Promise<ActionResponseModel>;
  getProvidersById(providerId: PrimaryKey): Promise<GetProvidersByIdResponseModel>;
  getProviderByPartnerId(partnerId: PrimaryKey): Promise<GetProviderByPartnerIdResponseModel>;
}
