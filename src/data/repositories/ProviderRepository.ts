import { DI_CONSTANTS } from '@/di/constants';
import { IProviderRepository } from '@/domain/boundaries';
import {
  AddProviderRequestModel,
  GetProviderNamesResponseModel,
  GetProviderRequestModel,
  GetProviderResponseModel
} from '@/domain/models';
import { cachedFn, ICacheService, IHttpService } from '@atom/common';
import { inject, injectable } from 'inversify';
import { API_ROUTES, CACHE_CONSTANTS } from '../constants';

@injectable()
export class ProviderRepository implements IProviderRepository {
  @inject(DI_CONSTANTS.HttpService)
  private readonly httpService: IHttpService;

  @inject(DI_CONSTANTS.CacheService)
  private readonly cacheService: ICacheService;

  getProviderNames = cachedFn(
    CACHE_CONSTANTS.GetProviderNamesResponse,
    async (isActive): Promise<GetProviderNamesResponseModel> => {
      return await this.httpService.get<GetProviderNamesResponseModel, {}>({
        url: API_ROUTES.PROVIDERS.GET_PROVIDER_NAMES,
        query: {
          isActive
        }
      });
    }
  ).bind(this);

  addProviders = async (addProviderRequestModel: AddProviderRequestModel) => {
    await this.httpService.post<void, {}, AddProviderRequestModel>({
      url: API_ROUTES.PROVIDERS.BASE_ROUTE,
      body: addProviderRequestModel
    });

    return true;
  };

  getProviders = async (getProviderRequestModel: GetProviderRequestModel): Promise<GetProviderResponseModel> => {
    return await this.httpService.get<GetProviderResponseModel, GetProviderRequestModel>({
      url: API_ROUTES.PROVIDERS.BASE_ROUTE,
      query: getProviderRequestModel
    });
  };
}
