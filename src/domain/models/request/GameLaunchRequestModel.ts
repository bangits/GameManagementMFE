import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class GameLaunchRequestModel {
  playerId: PrimaryKey;
  projectId: PrimaryKey;

  currencyId: PrimaryKey;
  currency: string;

  @AutoMap()
  gameId: PrimaryKey;

  @AutoMap()
  providerId: PrimaryKey;

  @AutoMap()
  gameLaunchUrl: string;
}
