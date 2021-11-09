import { GetProviderRequestModel } from '@/domain/models';
import { inject, injectable } from 'inversify';
import { GetProviderNamesResponseModel, GetProviderResponseModel } from '../models';
import { IProviderRepository } from './../boundaries';

@injectable()
export class ProviderUseCase {
  @inject('IProviderRepository')
  private readonly providerRepository: IProviderRepository;

  getProviders = async (providerRequestModel: GetProviderRequestModel): Promise<GetProviderResponseModel> => {
    return this.providerRepository.getProviders(providerRequestModel);
  };

  getProviderNames = async (): Promise<GetProviderNamesResponseModel> => {
    return this.providerRepository.getProviderNames();
  };
}
