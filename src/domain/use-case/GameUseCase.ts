import { DI_CONSTANTS } from '@/di/constants';
import {
  AddGameRequestModel,
  GetGameRequestModel,
  GetGameResponseModel,
  GetProviderGamesRequestModel,
  GetProviderGamesResponseModel
} from '@/domain/models';
import { mapper } from '@/mapper';
import {
  AddGameViewModel,
  GameLaunchViewModel,
  GamesDetailsViewModel,
  GamesFiltersViewModel,
  GetClassNamesViewModel,
  GetGameFeaturesViewModel,
  GetGamePlatformsViewModel,
  GetGameSupportedBrowsersViewModel,
  GetGamesViewModel,
  GetGameThemesViewModel,
  GetGameTypesViewModel,
  GetGameVolatilitiesViewModel,
  ProviderGamesViewModel
} from '@/view/models';
import { ProviderGamesFilterViewModel } from '@/view/models/view-models/game/ProviderGamesFilterViewModel';
import { PrimaryKey } from '@atom/common';
import { inject, injectable } from 'inversify';
import { IGameRepository } from './../boundaries';
import { GetGameByIdResponseModel } from './../models/response/GetGameByIdResponseModel';
@injectable()
export class GameUseCase {
  @inject(DI_CONSTANTS.GAME.GameRepository)
  private readonly gameRepository: IGameRepository;

  getGames = async (gamesFiltersViewModel: GamesFiltersViewModel): Promise<GetGamesViewModel> => {
    const getGameRequestModel = mapper.map(gamesFiltersViewModel, GetGameRequestModel, GamesFiltersViewModel);

    const getGameResponseModel = await this.gameRepository.getGames(getGameRequestModel);

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

  getGameTypes = async (parentTypeId?: PrimaryKey): Promise<GetGameTypesViewModel> => {
    if (parentTypeId !== undefined && !parentTypeId) return [];

    const getGameTypesResponse = await this.gameRepository.getGameTypes(parentTypeId);

    return getGameTypesResponse.results.map((r) => ({ value: r.id, label: r.name }));
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

    return getGameFeaturesResponse.results.map((r) => ({ value: r.id, label: r.name }));
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
    // if (!gameLaunchViewModel) return null;

    // const gameLaunchRequestModel = mapper.map(gameLaunchViewModel, GameLaunchRequestModel, GameLaunchViewModel);

    // return await this.gameRepository.gameLaunch(gameLaunchRequestModel);

    return 'https://partnerapi.sportdigi.com/GamesLaunch/Launch?gameid=5935&playMode=demo&deviceType=1&lang=EN&operatorId=DB6D2EB9&mainDomain=totogaming697.ru';
  };
}
