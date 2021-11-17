import { cachedFn, ICacheService, IHttpService } from '@atom/common';
import { inject, injectable } from 'inversify';
import { IProviderRepository } from '../boundaries/IProviderRepository';
import {
  AddProviderRequestModel,
  GetProviderNamesResponseModel,
  GetProviderRequestModel,
  GetProviderResponseModel
} from '../models';

@injectable()
export class ProviderRepository implements IProviderRepository {
  @inject('IHttpService')
  private readonly httpService: IHttpService;

  @inject('ICacheService')
  private readonly cacheService: ICacheService;

  getProviderNames = cachedFn('GetProviderNamesResponse', async (): Promise<GetProviderNamesResponseModel> => {
    return await this.httpService.get<GetProviderNamesResponseModel, {}>({
      url: '/Providers/ProvidersName'
    });
  }).bind(this);

  addProviders = async (addProviderRequestModel: AddProviderRequestModel) => {
    await this.httpService.post<void, {}, AddProviderRequestModel>({
      url: '/Providers',
      body: addProviderRequestModel
    });

    return true;
  };

  getProviders = async (
    getProviderRequestModel: Partial<GetProviderRequestModel>
  ): Promise<GetProviderResponseModel> => {
    return await this.httpService.get<GetProviderResponseModel, Partial<GetProviderRequestModel>>({
      url: '/Providers',
      query: getProviderRequestModel
    });
  };
}
