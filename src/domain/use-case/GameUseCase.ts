import { DI_CONSTANTS } from '@/di/constants';
import {
  AddGameRequestModel,
  ChangeGameStatusRequestModel,
  EditGameCompatibilityRequestModel,
  EditGameInformationRequestModel,
  EditGamePropertiesRequestModel,
  GameLaunchRequestModel,
  GetGameByIdResponseModel,
  GetGameRequestModel,
  GetGameResponseModel,
  GetProviderGamesRequestModel,
  GetProviderGamesResponseModel,
  UpdateImagesRequestModel
} from '@/domain/models';
import { mapper } from '@/mapper';
import {
  AddGameViewModel,
  ChangeGameStatusViewModel,
  EditGameCompatibilityViewModel,
  EditGameInformationViewModel,
  EditGamePropertiesViewModel,
  GameLaunchViewModel,
  GamesDetailsViewModel,
  GamesFiltersViewModel,
  GetClassNamesViewModel,
  GetGameFeaturesViewModel,
  GetGameNamesViewModel,
  GetGamePlatformsViewModel,
  GetGameSupportedBrowsersViewModel,
  GetGamesViewModel,
  GetGameThemesViewModel,
  GetGameTypesViewModel,
  GetGameVolatilitiesViewModel,
  ProviderGamesFilterViewModel,
  ProviderGamesViewModel,
  UpdateGameImagesViewModel
} from '@/view/models';
import { ActionResponseModel, PrimaryKey } from '@atom/common';
import { inject, injectable } from 'inversify';
import { IGameRepository } from './../boundaries';
@injectable()
export class GameUseCase {
  @inject(DI_CONSTANTS.GAME.GameRepository)
  private readonly gameRepository: IGameRepository;

  getGames = async (gamesFiltersViewModel: GamesFiltersViewModel): Promise<GetGamesViewModel> => {
    const getGameRequestModel = mapper.map(gamesFiltersViewModel, GetGameRequestModel, GamesFiltersViewModel);

    const getGameResponseModel = await this.gameRepository.getGames(getGameRequestModel);
    console.log(mapper.map(getGameResponseModel, GetGamesViewModel, GetGameResponseModel));

    return mapper.map(getGameResponseModel, GetGamesViewModel, GetGameResponseModel);
  };

  addGame = async (addGameViewModel: AddGameViewModel): Promise<boolean> => {
    const addGameRequestModel = mapper.map(addGameViewModel, AddGameRequestModel, AddGameViewModel);
    return this.gameRepository.addGame(addGameRequestModel);
  };

  getGameById = async (id: PrimaryKey): Promise<GamesDetailsViewModel> => {
    const getGameResponseModel = await this.gameRepository.getGameById(id);

    return mapper.map(getGameResponseModel, GamesDetailsViewModel, GetGameByIdResponseModel);
  };

  getGameTypes = async (parentTypeIds?: PrimaryKey[]): Promise<GetGameTypesViewModel> => {
    if (parentTypeIds !== undefined && !parentTypeIds) return [];

    const getGameTypesResponse = await this.gameRepository.getGameTypes(parentTypeIds);

    return getGameTypesResponse.results.map((r) => ({ value: r.id, label: r.name }));
  };
  getGameNames = async (isActive): Promise<GetGameNamesViewModel> => {
    if (isActive !== undefined && !isActive) return [];

    const getGameNamesResponse = await this.gameRepository.getGameNames(isActive);

    return getGameNamesResponse.map((r) => ({ value: r.id, label: r.name }));
  };

  getClassNames = async (): Promise<GetClassNamesViewModel> => {
    const getClassNamesResponse = await this.gameRepository.getClassNames();

    return getClassNamesResponse.results.map((r) => ({ value: r.id, label: r.name }));
  };

  getGameThemes = async (): Promise<GetGameThemesViewModel> => {
    const getGameThemesResponse = await this.gameRepository.getGameThemes();

    return getGameThemesResponse.results.map((r) => ({ value: r.id, label: r.name }));
  };

  getGameFeatures = async (): Promise<GetGameFeaturesViewModel> => {
    const getGameFeaturesResponse = await this.gameRepository.getGameFeatures();

    return getGameFeaturesResponse.results.map((r) => ({ value: r.id, label: r.name, gameIds: r.gameIds }));
  };

  getGameVolatilities = async (): Promise<GetGameVolatilitiesViewModel> => {
    const getGameVolatilitiesResponse = await this.gameRepository.getGameVolatilities();

    return getGameVolatilitiesResponse.results.map((r) => ({ value: r.id, label: r.name }));
  };

  getGameSupportedBrowsers = async (): Promise<GetGameSupportedBrowsersViewModel> => {
    const getGameSupportedBrowsersResponse = await this.gameRepository.getGameSupportedBrowsers();

    return getGameSupportedBrowsersResponse.results.map((r) => ({ value: r.id, label: r.name }));
  };

  getGamePlatforms = async (): Promise<GetGamePlatformsViewModel> => {
    const getGamePlatformsResponse = await this.gameRepository.getGamePlatforms();

    return getGamePlatformsResponse.results.map((r) => ({ value: r.id, label: r.name }));
  };

  getGamesByProviderId = async (
    providerGamesFilterViewModel: ProviderGamesFilterViewModel
  ): Promise<ProviderGamesViewModel> => {
    const getProviderGamesRequestModel = mapper.map(
      providerGamesFilterViewModel,
      GetProviderGamesRequestModel,
      ProviderGamesFilterViewModel
    );

    const getProviderGamesResponseModel = await this.gameRepository.getProviderGames(getProviderGamesRequestModel);

    return mapper.map(getProviderGamesResponseModel, ProviderGamesViewModel, GetProviderGamesResponseModel);
  };

  gameLaunch = async (gameLaunchViewModel: GameLaunchViewModel): Promise<string> => {
    if (!gameLaunchViewModel) return null;

    const gameLaunchRequestModel = mapper.map(gameLaunchViewModel, GameLaunchRequestModel, GameLaunchViewModel);

    return await this.gameRepository.gameLaunch(gameLaunchRequestModel);
  };

  changeGameStatus = async (changeGameStatusViewModel: ChangeGameStatusViewModel): Promise<ActionResponseModel> => {
    const changeGameStatusRequestModel = mapper.map(
      changeGameStatusViewModel,
      ChangeGameStatusRequestModel,
      ChangeGameStatusViewModel
    );

    return this.gameRepository.changeGameStatus(changeGameStatusRequestModel);
  };

  editGameInfo = async (editGameInfoViewModel: EditGameInformationViewModel): Promise<ActionResponseModel> => {
    const editGameInfoResponseModel = mapper.map(
      editGameInfoViewModel,
      EditGameInformationRequestModel,
      EditGameInformationViewModel
    );

    return this.gameRepository.editGameInfo(editGameInfoResponseModel);
  };

  editGameProperties = async (
    editGamePropertiesViewModel: EditGamePropertiesViewModel
  ): Promise<ActionResponseModel> => {
    const editGamePropertiesResponseModel = mapper.map(
      editGamePropertiesViewModel,
      EditGamePropertiesRequestModel,
      EditGamePropertiesViewModel
    );

    return this.gameRepository.editGameProperties(editGamePropertiesResponseModel);
  };

  editGameCompatibility = async (
    editGameCompatibilityViewModel: EditGameCompatibilityViewModel
  ): Promise<ActionResponseModel> => {
    const editGamePropertiesResponseModel = mapper.map(
      editGameCompatibilityViewModel,
      EditGameCompatibilityRequestModel,
      EditGameCompatibilityViewModel
    );

    return this.gameRepository.editGameCompatibility(editGamePropertiesResponseModel);
  };

  updateGameImages = async (updateGameImagesViewModel: UpdateGameImagesViewModel): Promise<boolean> => {
    const updateImagesRequestModel = mapper.map(
      updateGameImagesViewModel,
      UpdateImagesRequestModel,
      UpdateGameImagesViewModel
    );

    await this.gameRepository.updateGameImages(updateImagesRequestModel);

    return true;
  };
}
