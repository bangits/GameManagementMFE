import { AddProviderRequestModel, GetProviderRequestModel } from '@/domain/models';
import { inject, injectable } from 'inversify';
import { GetProviderNamesResponseModel, GetProviderResponseModel } from '../models';
import { IProviderRepository } from './../boundaries';

@injectable()
export class ProviderUseCase {
  @inject('IProviderRepository')
  private readonly providerRepository: IProviderRepository;

  getProviders = async (providerRequestModel: Partial<GetProviderRequestModel>): Promise<GetProviderResponseModel> => {
    return this.providerRepository.getProviders(providerRequestModel);
  };

  addProviders = async (addProviderRequestModel: AddProviderRequestModel): Promise<boolean> => {
    return this.providerRepository.addProviders(addProviderRequestModel);
  };

  getProviderNames = async (): Promise<GetProviderNamesResponseModel> => {
    return this.providerRepository.getProviderNames();
  };
}
