import { DI_CONSTANTS } from '@/di/constants';
import { AddGameRequestModel, GetGameRequestModel, GetGameResponseModel } from '@/domain/models';
import { mapper } from '@/mapper';
import {
  AddGameViewModel,
  GamesFiltersViewModel,
  GetClassNamesViewModel,
  GetGameFeaturesViewModel,
  GetGamePlatformsViewModel,
  GetGameSupportedBrowsersViewModel,
  GetGamesViewModel,
  GetGameThemesViewModel,
  GetGameTypesViewModel,
  GetGameVolatilitiesViewModel
} from '@/view/models';
import { PrimaryKey } from '@atom/common';
import { inject, injectable } from 'inversify';
import { IGameRepository } from './../boundaries';

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
  /////
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
}
