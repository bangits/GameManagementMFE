import { DI_CONSTANTS } from '@/di/constants';
import { IGameRepository } from '@/domain/boundaries';
import {
  AddGameRequestModel,
  ChangeGameStatusRequestModel,
  GameLaunchRequestModel,
  GetClassNamesResponseModel,
  GetGameByIdResponseModel,
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
import { ActionResponseModel, cachedFn, ICacheService, IHttpService, PrimaryKey } from '@atom/common';
import { inject, injectable } from 'inversify';
import { API_ROUTES, CACHE_CONSTANTS } from '../constants';
import { EditGameInformationRequestModel } from './../../domain/models/request/EditGameInformationRequestModel';

@injectable()
export class GameRepository implements IGameRepository {
  @inject(DI_CONSTANTS.HttpService)
  private readonly httpService: IHttpService;

  @inject(DI_CONSTANTS.GameLauncherHttpService)
  private readonly gameLauncherHttpService: IHttpService;

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

  getGameById = async (gameId: PrimaryKey): Promise<GetGameByIdResponseModel> => {
    return await this.httpService.get<GetGameByIdResponseModel, {}>({
      url: API_ROUTES.GAMES.BASE_ROUTE + `/${gameId}`
    });
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

  gameLaunch = async (gameLauncherRequestModel: GameLaunchRequestModel): Promise<string> => {
    return await this.gameLauncherHttpService.get<string, GameLaunchRequestModel>({
      url: API_ROUTES.GAMES.LAUNCH_GAME,
      query: gameLauncherRequestModel
    });
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
        url: API_ROUTES.GAMES.GET_GAME_PLATFORMS
      });
    }
  ).bind(this);

  changeGameStatus = async (
    changeGameStatusRequestModel: ChangeGameStatusRequestModel
  ): Promise<ActionResponseModel> => {
    return await this.httpService.put<ActionResponseModel, ChangeGameStatusRequestModel, {}>({
      url: API_ROUTES.GAMES.CHANGE_STATUS,
      body: changeGameStatusRequestModel
    });
  };

  editGameInfo = async (editGameInfoRequestModel: EditGameInformationRequestModel): Promise<ActionResponseModel> => {
    return await this.httpService.put<ActionResponseModel, {}, EditGameInformationRequestModel>({
      url: API_ROUTES.GAMES.EDIT_GAME_INFO,
      body: editGameInfoRequestModel
    });
  };
}
