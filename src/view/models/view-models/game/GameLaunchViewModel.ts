import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class GameLaunchViewModel {
  @AutoMap()
  userId: PrimaryKey;

  @AutoMap()
  gameId: PrimaryKey;

  @AutoMap()
  providerId: PrimaryKey;

  @AutoMap()
  gameLaunchUrl: string;
}
