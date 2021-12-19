import { ActionResponseModel, PrimaryKey } from '@atom/common';
import {
  AddProviderRequestModel,
  ChangeProviderStatusRequestModel,
  EditProviderGeneralInformationRequestModel,
  GetGameTypesAndCountResponseModel,
  GetProviderByPartnerIdResponseModel,
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
  editProviderGeneralInfo(
    editProviderGeneralInformationRequestModel: EditProviderGeneralInformationRequestModel
  ): Promise<ActionResponseModel>;
  getProviderByPartnerId(partnerId: PrimaryKey): Promise<GetProviderByPartnerIdResponseModel>;
}
