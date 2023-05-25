import { ActionResponseModel, PrimaryKey } from '@atom/common';
import {
  AddGameRequestModel,
  ChangeGameFreeSpinSupportRequestModel,
  ChangeGameStatusRequestModel,
  EditGameCompatibilityRequestModel,
  EditGameInformationRequestModel,
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
} from '../models';

export interface IGameRepository {
  getGames(getGameRequestModel: GetGameRequestModel): Promise<GetGameResponseModel>;
  addGame(addGameRequestModel: AddGameRequestModel): Promise<boolean>;
  getGameById(id: PrimaryKey): Promise<GetGameByIdResponseModel>;
  getGameNames(isActive?: boolean): Promise<GetGameNamesResponseModel>;

  getGameTypes(parentTypeId?: PrimaryKey): Promise<GetGameTypesResponseModel>;
  getClassNames(): Promise<GetClassNamesResponseModel>;
  getGameThemes(): Promise<GetGameThemesResponseModel>;
  getGameFeatures(): Promise<GetGameFeaturesResponseModel>;
  getGameVolatilities(): Promise<GetGameVolatilitiesResponseModel>;
  getGameSupportedBrowsers(): Promise<GetGameSupportedBrowsersResponseModel>;
  getGamePlatforms(): Promise<GetGamePlatformsResponseModel>;
  getProviderGames(getProviderGamesRequestModel: GetProviderGamesRequestModel): Promise<GetProviderGamesResponseModel>;
  gameLaunch(gameLaunchRequestModel: GameLaunchRequestModel): Promise<string>;
  changeGameStatus(changeGameStatus: ChangeGameStatusRequestModel): Promise<ActionResponseModel>;
  changeGameFreeSpinSupport(
    changeGameFreeSpinSupportRequestModel: ChangeGameFreeSpinSupportRequestModel
  ): Promise<ActionResponseModel>;
  editGameInfo(editGameInfoRequestModel: EditGameInformationRequestModel): Promise<ActionResponseModel>;
  editGameProperties(editGamePropertiesRequestModel: EditGamePropertiesRequestModel): Promise<ActionResponseModel>;
  editGameCompatibility(
    editGameCompatibilityRequestModel: EditGameCompatibilityRequestModel
  ): Promise<ActionResponseModel>;
  updateGameImages(updateImagesRequestModel: UpdateImagesRequestModel): Promise<true>;
}
