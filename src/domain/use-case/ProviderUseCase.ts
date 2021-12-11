import { DI_CONSTANTS } from '@/di/constants';
import {
  AddProviderRequestModel,
  GetProviderRequestModel,
  GetProviderResponseModel,
  GetProvidersByIdResponseModel
} from '@/domain/models';
import { mapper } from '@/mapper';
import {
  AddProviderViewModel,
  GetProviderNamesViewModel,
  GetProvidersByIdViewModel,
  GetProvidersViewModel,
  ProvidersFiltersViewModel
} from '@/view/models';
import { PrimaryKey } from '@atom/common';
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

  getProviderNames = async (): Promise<GetProviderNamesViewModel> => {
    const getProviderNamesResponse = await this.providerRepository.getProviderNames();

    return getProviderNamesResponse.map((r) => ({ value: r.id, label: r.name }));
  };

  addProviders = async (addProviderViewModel: AddProviderViewModel): Promise<boolean> => {
    const addProviderRequestModel = mapper.map(addProviderViewModel, AddProviderRequestModel, AddProviderViewModel);
    return this.providerRepository.addProviders(addProviderRequestModel);
  };

  getProvidersById = async (providerId: PrimaryKey): Promise<GetProvidersByIdViewModel> => {
    const getProvidersByIdResponseModel = await this.providerRepository.getProvidersById(providerId);

    return await mapper.map(getProvidersByIdResponseModel, GetProvidersByIdViewModel, GetProvidersByIdResponseModel);
  };
}
