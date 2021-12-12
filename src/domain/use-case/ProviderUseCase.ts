import { DI_CONSTANTS } from '@/di/constants';
import { AddProviderRequestModel, GetProviderRequestModel, GetProviderResponseModel } from '@/domain/models';
import { mapper } from '@/mapper';
import {
  AddProviderViewModel,
  GetProviderNamesViewModel,
  GetProvidersViewModel,
  ProvidersFiltersViewModel
} from '@/view/models';
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
}
