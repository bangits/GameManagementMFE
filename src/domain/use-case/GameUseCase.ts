import { DI_CONSTANTS } from '@/di/constants';
import { GetGameRequestModel, GetGameResponseModel } from '@/domain/models';
import { mapper } from '@/mapper';
import { GamesFiltersViewModel, GetGamesViewModel } from '@/view/models';
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

  // addGames = async (addGameViewModel: AddGameViewModel): Promise<boolean> => {
  //   const addGameRequestModel = mapper.map(addGameViewModel, AddGameRequestModel, AddGameViewModel);
  //   return this.providerRepository.addGames(addGameRequestModel);
  // };

  // getGameNames = async (): Promise<GetGameNamesResponseModel> => {
  //   return this.providerRepository.getGameNames();
  // };
}
