import { DI_CONSTANTS } from '@/di/constants';
import {
  AddProviderRequestModel,
  ChangeProviderStatusRequestModel,
  EditProviderGeneralInformationRequestModel,
  GetProviderByPartnerIdResponseModel,
  GetProviderRequestModel,
  GetProviderResponseModel,
  GetProvidersByIdResponseModel
} from '@/domain/models';
import { mapper } from '@/mapper';
import {
  AddProviderViewModel,
  ChangeProviderStatusViewModel,
  EditProviderGeneralInformationViewModel,
  GetProviderByPartnerIdViewModel,
  GetProviderNamesViewModel,
  GetProvidersByIdViewModel,
  GetProvidersViewModel,
  ProviderGamesTypesViewModel,
  ProvidersFiltersViewModel
} from '@/view/models';
import { ActionResponseModel, PrimaryKey } from '@atom/common';
import { inject, injectable } from 'inversify';
import { IProviderRepository } from '../boundaries';

@injectable()
export class ProviderUseCase {
  @inject(DI_CONSTANTS.PROVIDER.ProviderRepository)
  private readonly providerRepository: IProviderRepository;

  getProviders = async (providersFiltersViewModel: ProvidersFiltersViewModel): Promise<GetProvidersViewModel> => {
    const getProviderRequestModel = mapper.map(
      providersFiltersViewModel,
      GetProviderRequestModel,
      ProvidersFiltersViewModel
    );

    const getProviderResponseModel = await this.providerRepository.getProviders(getProviderRequestModel);

    return mapper.map(getProviderResponseModel, GetProvidersViewModel, GetProviderResponseModel);
  };

  getProviderNames = async (isActive): Promise<GetProviderNamesViewModel> => {
    if (isActive !== undefined && !isActive) return [];

    const getProviderNamesResponse = await this.providerRepository.getProviderNames(isActive);

    return getProviderNamesResponse.map((r) => ({ value: r.id, label: r.name }));
  };

  addProviders = async (addProviderViewModel: AddProviderViewModel): Promise<boolean> => {
    const addProviderRequestModel = mapper.map(addProviderViewModel, AddProviderRequestModel, AddProviderViewModel);
    return this.providerRepository.addProviders(addProviderRequestModel);
  };

  changeProviderStatus = async (
    changeProviderStatusViewModel: ChangeProviderStatusViewModel
  ): Promise<ActionResponseModel> => {
    const changeProviderStatusRequestModel = mapper.map(
      changeProviderStatusViewModel,
      ChangeProviderStatusRequestModel,
      ChangeProviderStatusViewModel
    );

    return this.providerRepository.changeProviderStatus(changeProviderStatusRequestModel);
  };

  getProvidersById = async (providerId: PrimaryKey): Promise<GetProvidersByIdViewModel> => {
    const getProvidersByIdResponseModel = await this.providerRepository.getProvidersById(providerId);

    return mapper.map(getProvidersByIdResponseModel, GetProvidersByIdViewModel, GetProvidersByIdResponseModel);
  };

  getProviderGameTypesAndCount = async (providerId: PrimaryKey): Promise<ProviderGamesTypesViewModel[]> => {
    return await this.providerRepository.getProviderGameTypesAndCount(providerId);
  };

  editProviderGeneralInfo = async (
    editProviderGeneralInfoViewModel: EditProviderGeneralInformationViewModel
  ): Promise<ActionResponseModel> => {
    const editProviderGeneralInfoResponseModel = mapper.map(
      editProviderGeneralInfoViewModel,
      EditProviderGeneralInformationRequestModel,
      EditProviderGeneralInformationViewModel
    );

    return this.providerRepository.editProviderGeneralInfo(editProviderGeneralInfoResponseModel);
  };

  getProviderByPartnerId = async (partnerId: PrimaryKey): Promise<GetProviderByPartnerIdViewModel> => {
    const getProviderByPartnerIdResponseModel = await this.providerRepository.getProviderByPartnerId(partnerId);

    return await mapper.map(
      getProviderByPartnerIdResponseModel,
      GetProviderByPartnerIdViewModel,
      GetProviderByPartnerIdResponseModel
    );
  };
}
