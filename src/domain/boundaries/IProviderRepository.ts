import { ActionResponseModel, PrimaryKey } from '@atom/common';
import {
  AddProviderRequestModel,
  ChangeProviderFreeSpinSupportRequestModel,
  ChangeProviderStatusRequestModel,
  EditProviderGeneralInformationRequestModel,
  GetGameTypesAndCountResponseModel,
  GetProviderByPartnerIdResponseModel,
  GetProviderIntegrationTypesResponseModel,
  GetProviderNamesResponseModel,
  GetProviderRequestModel,
  GetProviderResponseModel,
  GetProvidersByIdResponseModel,
  UpdateProviderLogoRequestModel
} from '../models';

export interface IProviderRepository {
  getProviders(getProviderRequestModel: GetProviderRequestModel): Promise<GetProviderResponseModel>;
  getProviderNames(isActive?: boolean): Promise<GetProviderNamesResponseModel>;
  getProviderIntegrationTypes(): Promise<GetProviderIntegrationTypesResponseModel>;

  addProvider(addProviderRequestModel: AddProviderRequestModel): Promise<boolean>;
  changeProviderStatus(changeProviderStatus: ChangeProviderStatusRequestModel): Promise<ActionResponseModel>;
  changeProviderFreeSpinSupport(
    changeProviderFreeSpinSupportRequestModel: ChangeProviderFreeSpinSupportRequestModel
  ): Promise<ActionResponseModel>;
  getProvidersById(providerId: PrimaryKey): Promise<GetProvidersByIdResponseModel>;
  getProviderGameTypesAndCount(providerId: PrimaryKey): Promise<GetGameTypesAndCountResponseModel[]>;
  editProviderGeneralInfo(
    editProviderGeneralInformationRequestModel: EditProviderGeneralInformationRequestModel
  ): Promise<ActionResponseModel>;
  getProviderByPartnerId(partnerId: PrimaryKey): Promise<GetProviderByPartnerIdResponseModel>;
  updateProviderLogo(updateProviderLogoRequestModel: UpdateProviderLogoRequestModel): Promise<boolean>;
}
