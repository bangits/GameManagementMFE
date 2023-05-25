import { DI_CONSTANTS } from '@/di/constants';
import { IProviderRepository } from '@/domain/boundaries';
import {
  AddProviderRequestModel,
  ChangeProviderFreeSpinSupportRequestModel,
  ChangeProviderStatusRequestModel,
  EditProviderGeneralInformationRequestModel,
  GetGameTypesAndCountResponseModel,
  GetProviderByPartnerIdResponseModel,
  GetProviderIntegrationTypesResponseModel,
  GetProviderNamesResponseModel,
  GetProviderRequestModel,
  GetProviderResponseModel,
  GetProvidersByIdResponseModel,
  UpdateProviderLogoRequestModel
} from '@/domain/models';
import { ActionResponseModel, ICacheService, IHttpService, PrimaryKey, cachedFn } from '@atom/common';
import { inject, injectable } from 'inversify';
import { API_ROUTES, CACHE_CONSTANTS } from '../constants';

@injectable()
export class ProviderRepository implements IProviderRepository {
  @inject(DI_CONSTANTS.HttpService)
  private readonly httpService: IHttpService;

  @inject(DI_CONSTANTS.CacheService)
  private readonly cacheService: ICacheService;

  getProviderNames = async (isActive): Promise<GetProviderNamesResponseModel> => {
    return await this.httpService.get<GetProviderNamesResponseModel, {}>({
      url: API_ROUTES.PROVIDERS.GET_PROVIDER_NAMES,
      query: {
        isActive
      }
    });
  };

  addProvider = async (addProviderRequestModel: AddProviderRequestModel) => {
    await this.httpService.post<void, {}, AddProviderRequestModel['providers']>({
      url: API_ROUTES.PROVIDERS.BASE_ROUTE,
      body: addProviderRequestModel.providers
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

  getProviderGameTypesAndCount = async (providerId: PrimaryKey): Promise<GetGameTypesAndCountResponseModel[]> => {
    return await this.httpService.get<GetGameTypesAndCountResponseModel[], { providerId: PrimaryKey }>({
      url: API_ROUTES.PROVIDERS.PROVIDER_GET_GAME_TYPES,
      query: {
        providerId
      }
    });
  };

  getProviderIntegrationTypes = cachedFn(
    CACHE_CONSTANTS.GetProviderIntegrationTypesResponse,
    async (): Promise<GetProviderIntegrationTypesResponseModel> => {
      return await this.httpService.get<GetProviderIntegrationTypesResponseModel, {}>({
        url: API_ROUTES.PROVIDERS.GET_PROVIDER_INTEGRATION_TYPES
      });
    }
  ).bind(this);

  editProviderGeneralInfo = async (
    editProviderGeneralInformationRequestModel: EditProviderGeneralInformationRequestModel
  ): Promise<ActionResponseModel> => {
    return await this.httpService.put<ActionResponseModel, {}, EditProviderGeneralInformationRequestModel>({
      url: API_ROUTES.PROVIDERS.EDIT_GENERAL_INFORMATION,
      body: editProviderGeneralInformationRequestModel
    });
  };

  getProviderByPartnerId = async (partnerId: PrimaryKey): Promise<GetProviderByPartnerIdResponseModel> => {
    return await this.httpService.get<GetProviderByPartnerIdResponseModel, {}>({
      url: API_ROUTES.PROVIDERS.PARTNER_PROVIDER,
      query: {
        partnerId: partnerId
      }
    });
  };

  changeProviderFreeSpinSupport = async (
    changeProviderFreeSpinSupportRequestModel: ChangeProviderFreeSpinSupportRequestModel
  ): Promise<ActionResponseModel> => {
    return await this.httpService.put({
      url: API_ROUTES.PROVIDERS.CHANGE_FREE_SPIN_SUPPORT,
      body: changeProviderFreeSpinSupportRequestModel
    });
  };

  updateProviderLogo = async (updateProviderLogoRequestModel: UpdateProviderLogoRequestModel): Promise<boolean> => {
    return await this.httpService.put<boolean, {}, UpdateProviderLogoRequestModel>({
      url: API_ROUTES.PROVIDERS.UPDATE_LOGO,
      body: updateProviderLogoRequestModel
    });
  };
}
