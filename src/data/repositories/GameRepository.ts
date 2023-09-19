import { DI_CONSTANTS } from '@/di/constants';
import { IGameRepository } from '@/domain/boundaries';
import {
  AddGameRequestModel,
  ChangeGameFreeSpinSupportRequestModel,
  ChangeGameStatusRequestModel,
  EditGameCompatibilityRequestModel,
  EditGamePropertiesRequestModel,
  GameLaunchRequestModel,
  GetClassNamesResponseModel,
  GetGameByIdResponseModel,
  GetGameFeaturesResponseModel,
  GetGameNamesResponseModel,
  GetGamePlatformsResponseModel,
  GetGameRequestModel,
  GetGameResponseModel,
  GetGameSupportedBrowsersResponseModel,
  GetGameThemesResponseModel,
  GetGameTypesResponseModel,
  GetGameVolatilitiesResponseModel,
  GetProviderGamesRequestModel,
  GetProviderGamesResponseModel,
  UpdateImagesRequestModel
} from '@/domain/models';
import { ActionResponseModel, ICacheService, IHttpService, MAX_PAGE_SIZE, PrimaryKey, cachedFn } from '@atom/common';
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

  getGameNames = async (isActive): Promise<GetGameNamesResponseModel> => {
    return await this.httpService.get<GetGameNamesResponseModel, {}>({
      url: API_ROUTES.GAMES.GET_GAME_NAMES,
      query: {
        isActive
      }
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
    const getGameByIdResponseModel = await this.httpService.get<GetGameByIdResponseModel[], {}>({
      url: API_ROUTES.GAMES.GET_BY_ID,
      query: {
        ids: [gameId]
      }
    });

    return getGameByIdResponseModel[0] || null;
  };

  getGameTypes = async (parentTypeIds?: PrimaryKey[]): Promise<GetGameTypesResponseModel> => {
    return await this.httpService.get<GetGameTypesResponseModel, {}>({
      url: API_ROUTES.GAMES.GET_GAME_TYPES,
      query: {
        parentTypeIds,
        pageSize: MAX_PAGE_SIZE
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
    return (
      await this.gameLauncherHttpService.post<{ gameLaunchUrl: string }, {}, GameLaunchRequestModel>({
        url: !gameLauncherRequestModel.isDemo ? API_ROUTES.GAMES.LAUNCH_GAME : API_ROUTES.GAMES.LAUNCH_GAME_DEMO,
        body: gameLauncherRequestModel
      })
    )?.gameLaunchUrl;
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

  changeGameFreeSpinSupport = async (
    changeGameFreeSpinSupportRequestModel: ChangeGameFreeSpinSupportRequestModel
  ): Promise<ActionResponseModel> => {
    return await this.httpService.put({
      url: API_ROUTES.GAMES.CHANGE_FREE_SPIN_SUPPORT,
      body: changeGameFreeSpinSupportRequestModel
    });
  };

  editGameInfo = async (editGameInfoRequestModel: EditGameInformationRequestModel): Promise<ActionResponseModel> => {
    return await this.httpService.put<ActionResponseModel, {}, EditGameInformationRequestModel>({
      url: API_ROUTES.GAMES.EDIT_GAME_INFO,
      body: editGameInfoRequestModel
    });
  };

  editGameProperties = async (
    editGamePropertiesRequestModel: EditGamePropertiesRequestModel
  ): Promise<ActionResponseModel> => {
    return await this.httpService.put<ActionResponseModel, {}, EditGamePropertiesRequestModel>({
      url: API_ROUTES.GAMES.EDIT_GAME_PROPERTIES,
      body: editGamePropertiesRequestModel
    });
  };

  editGameCompatibility = async (
    editGameCompatibilityRequestModel: EditGameCompatibilityRequestModel
  ): Promise<ActionResponseModel> => {
    return await this.httpService.put<ActionResponseModel, {}, EditGameCompatibilityRequestModel>({
      url: API_ROUTES.GAMES.EDIT_GAME_COMPATIBILITY,
      body: editGameCompatibilityRequestModel
    });
  };

  updateGameImages = async (updateImagesRequestModel: UpdateImagesRequestModel): Promise<true> => {
    await this.httpService.put<ActionResponseModel, {}, UpdateImagesRequestModel>({
      url: API_ROUTES.GAMES.UPDATE_IMAGES,
      body: updateImagesRequestModel
    });

    return true;
  };
}
