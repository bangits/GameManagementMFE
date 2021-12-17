import { DI_CONSTANTS } from '@/di/constants';
import { IProviderRepository } from '@/domain/boundaries';
import {
  AddProviderRequestModel,
  ChangeProviderStatusRequestModel,
  GetProviderNamesResponseModel,
  GetProviderRequestModel,
  GetProviderResponseModel,
  GetProvidersByIdResponseModel
} from '@/domain/models';
import { ActionResponseModel, cachedFn, ICacheService, IHttpService, PrimaryKey } from '@atom/common';
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

  getProvidersById = async (providerId: PrimaryKey): Promise<GetProvidersByIdResponseModel> => {
    return await this.httpService.get<GetProvidersByIdResponseModel, {}>({
      url: API_ROUTES.PROVIDERS.BASE_ROUTE + `/${providerId}`
    });
  };

  changeProviderStatus = async (
    changeProviderStatusRequestModel: ChangeProviderStatusRequestModel
  ): Promise<ActionResponseModel> => {
    return await this.httpService.put<ActionResponseModel, ChangeProviderStatusRequestModel, {}>({
      url: API_ROUTES.PROVIDERS.CHANGE_STATUS,
      body: changeProviderStatusRequestModel
    });
  };
}
