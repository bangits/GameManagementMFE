import { PrimaryKey } from '@atom/common';
import {
  AddGameRequestModel,
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
} from '../models';

export interface IGameRepository {
  getGames(getGameRequestModel: GetGameRequestModel): Promise<GetGameResponseModel>;
  addGame(addGameRequestModel: AddGameRequestModel): Promise<boolean>;
  getGameById(id: PrimaryKey): Promise<GetGameByIdResponseModel>;

  getGameTypes(parentTypeId?: PrimaryKey): Promise<GetGameTypesResponseModel>;
  getClassNames(): Promise<GetClassNamesResponseModel>;
  getGameThemes(): Promise<GetGameThemesResponseModel>;
  getGameFeatures(): Promise<GetGameFeaturesResponseModel>;
  getGameVolatilities(): Promise<GetGameVolatilitiesResponseModel>;
  getGameSupportedBrowsers(): Promise<GetGameSupportedBrowsersResponseModel>;
  getGamePlatforms(): Promise<GetGamePlatformsResponseModel>;
  getProviderGames(getProviderGamesRequestModel: GetProviderGamesRequestModel): Promise<GetProviderGamesResponseModel>;
  gameLaunch(gameLaunchRequestModel: GameLaunchRequestModel): Promise<string>;
}
