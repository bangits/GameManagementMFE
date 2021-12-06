import { GetGameRequestModel, GetGameResponseModel } from '../models';

export interface IGameRepository {
  getGames(getGameRequestModel: GetGameRequestModel): Promise<GetGameResponseModel>;
  // getGameNames(): Promise<GetGameNamesResponseModel>;

  // addGames(addGameRequestModel: AddGameRequestModel): Promise<boolean>;
}
