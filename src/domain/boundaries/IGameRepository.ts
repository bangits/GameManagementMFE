import { GetGameRequestModel, GetGameResponseModel } from '../models';

export interface IGameRepository {
  getGames(getGameRequestModel: GetGameRequestModel): Promise<GetGameResponseModel>;
}
