import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class GameLaunchViewModel {
  userId: PrimaryKey;

  @AutoMap()
  currencyId: PrimaryKey;

  @AutoMap()
  currency: string;

  @AutoMap()
  gameId: PrimaryKey;

  @AutoMap()
  providerId: PrimaryKey;

  @AutoMap()
  gameLaunchUrl: string;
}
