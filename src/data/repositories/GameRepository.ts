import { DI_CONSTANTS } from '@/di/constants';
import { IGameRepository } from '@/domain/boundaries';
import {
  AddGameRequestModel,
  GetClassNamesResponseModel,
  GetGameFeaturesResponseModel,
  GetGamePlatformsResponseModel,
  GetGameRequestModel,
  GetGameResponseModel,
  GetGameSupportedBrowsersResponseModel,
  GetGameThemesResponseModel,
  GetGameTypesResponseModel,
  GetGameVolatilitiesResponseModel,
  GetProviderGamesRequestModel,
  GetProviderGamesResponseModel
} from '@/domain/models';
import { cachedFn, ICacheService, IHttpService, PrimaryKey } from '@atom/common';
import { inject, injectable } from 'inversify';
import { API_ROUTES, CACHE_CONSTANTS } from '../constants';

@injectable()
export class GameRepository implements IGameRepository {
  @inject(DI_CONSTANTS.HttpService)
  private readonly httpService: IHttpService;

  @inject(DI_CONSTANTS.CacheService)
  private readonly cacheService: ICacheService;

  getGames = async (getGameRequestModel: GetGameRequestModel): Promise<GetGameResponseModel> => {
    return await this.httpService.get<GetGameResponseModel, GetGameRequestModel>({
      url: API_ROUTES.GAMES.BASE_ROUTE,
      query: getGameRequestModel
    });
  };

  addGame = async (addGameRequestModel: AddGameRequestModel) => {
    await this.httpService.post<void, {}, AddGameRequestModel>({
      url: API_ROUTES.GAMES.BASE_ROUTE,
      body: addGameRequestModel
    });

    return true;
  };

  getGameTypes = async (parentTypeId?: PrimaryKey): Promise<GetGameTypesResponseModel> => {
    return await this.httpService.get<GetGameTypesResponseModel, {}>({
      url: API_ROUTES.GAMES.GET_GAME_TYPES,
      query: {
        parentTypeId
      }
    });
  };

  getProviderGames = async (
    getProviderGamesRequestModel: GetProviderGamesRequestModel
  ): Promise<GetProviderGamesResponseModel> => {
    return await this.httpService.get<GetProviderGamesResponseModel, {}>({
      url: API_ROUTES.GAMES.GET_PROVIDER_GAMES,
      query: getProviderGamesRequestModel
    });
  };

  gameLaunch = async (): Promise<string> => {
    return '';
  };

  getClassNames = cachedFn(CACHE_CONSTANTS.GetClassNamesResponse, async (): Promise<GetClassNamesResponseModel> => {
    return await this.httpService.get<GetClassNamesResponseModel, {}>({
      url: API_ROUTES.GAMES.GET_CLASS_NAMES
    });
  }).bind(this);

  getGameThemes = cachedFn(CACHE_CONSTANTS.GetGameThemesResponse, async (): Promise<GetGameThemesResponseModel> => {
    return await this.httpService.get<GetGameTypesResponseModel, {}>({
      url: API_ROUTES.GAMES.GET_GAME_THEMES
    });
  }).bind(this);

  getGameFeatures = cachedFn(
    CACHE_CONSTANTS.GetGameFeaturesResponse,
    async (): Promise<GetGameFeaturesResponseModel> => {
      return await this.httpService.get<GetGameFeaturesResponseModel, {}>({
        url: API_ROUTES.GAMES.GET_GAME_FEATURES
      });
    }
  ).bind(this);

  getGameVolatilities = cachedFn(
    CACHE_CONSTANTS.GetGameVolatilitiesResponse,
    async (): Promise<GetGameVolatilitiesResponseModel> => {
      return await this.httpService.get<GetGameVolatilitiesResponseModel, {}>({
        url: API_ROUTES.GAMES.GET_GAME_VOLATILITIES
      });
    }
  ).bind(this);

  getGameSupportedBrowsers = cachedFn(
    CACHE_CONSTANTS.GetGameSupportedBrowsersResponse,
    async (): Promise<GetGameSupportedBrowsersResponseModel> => {
      return await this.httpService.get<GetGameSupportedBrowsersResponseModel, {}>({
        url: API_ROUTES.GAMES.GET_GAME_SUPPORTED_BROWSERS
      });
    }
  ).bind(this);

  getGamePlatforms = cachedFn(
    CACHE_CONSTANTS.GetGamePlatformsResponse,
    async (): Promise<GetGamePlatformsResponseModel> => {
      return await this.httpService.get<GetGamePlatformsResponseModel, {}>({
        url: API_ROUTES.GAMES.GET_GAME_SUPPORTED_BROWSERS
      });
    }
  ).bind(this);
}
