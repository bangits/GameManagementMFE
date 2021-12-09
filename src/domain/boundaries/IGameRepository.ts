import {
  GetClassNamesResponseModel,
  GetGameFeaturesResponseModel,
  GetGameRequestModel,
  GetGameResponseModel,
  GetGameSupportedBrowsersResponseModel,
  GetGameThemesResponseModel,
  GetGameTypesResponseModel,
  GetGameVolatilitiesResponseModel
} from '../models';

export interface IGameRepository {
  getGames(getGameRequestModel: GetGameRequestModel): Promise<GetGameResponseModel>;
  getGameTypes(): Promise<GetGameTypesResponseModel>;
  getClassNames(): Promise<GetClassNamesResponseModel>;
  getGameThemes(): Promise<GetGameThemesResponseModel>;
  getGameFeatures(): Promise<GetGameFeaturesResponseModel>;
  getGameVolatilities(): Promise<GetGameVolatilitiesResponseModel>;
  getGameSupportedBrowsers(): Promise<GetGameSupportedBrowsersResponseModel>;
}
