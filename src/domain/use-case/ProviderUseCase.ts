import { DI_CONSTANTS } from '@/di/constants';
import { AddProviderRequestModel, GetProviderRequestModel, GetProviderResponseModel } from '@/domain/models';
import { mapper } from '@/mapper';
import { AddProviderViewModel, GetProvidersViewModel, ProvidersFiltersViewModel } from '@/view/models';
import { inject, injectable } from 'inversify';
import { GetProviderNamesResponseModel } from '../models';
import { IProviderRepository } from './../boundaries';

@injectable()
export class ProviderUseCase {
  @inject(DI_CONSTANTS.ProviderRepository)
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

  addProviders = async (addProviderViewModel: AddProviderViewModel): Promise<boolean> => {
    const addProviderRequestModel = mapper.map(addProviderViewModel, AddProviderRequestModel, AddProviderViewModel);
    return this.providerRepository.addProviders(addProviderRequestModel);
  };

  getProviderNames = async (): Promise<GetProviderNamesResponseModel> => {
    return this.providerRepository.getProviderNames();
  };
}
