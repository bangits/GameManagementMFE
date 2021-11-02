import { GetProviderRequestModel } from '@/domain/models';
import { inject, injectable } from 'inversify';
import { IProviderRepository } from './../boundaries';
import { GetProviderResponseModel } from './../models/response/GetProviderResponseModel';

@injectable()
export class ProviderUseCase {
  @inject('IProviderRepository')
  private readonly providerRepository: IProviderRepository;

  getProviders = async (providerRequestModel: GetProviderRequestModel): Promise<GetProviderResponseModel> => {
    return this.providerRepository.getProviders(providerRequestModel);
  };
}
