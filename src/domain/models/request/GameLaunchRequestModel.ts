import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class GameLaunchRequestModel {
  playerId: PrimaryKey;
  projectId: PrimaryKey;

  @AutoMap()
  currencyId: PrimaryKey;

  @AutoMap()
  currency: string;

  @AutoMap()
  gameId: PrimaryKey | string;

  @AutoMap()
  providerId: PrimaryKey;

  @AutoMap()
  providerName: string;

  @AutoMap()
  gameLaunchUrl: string;

  @AutoMap()
  lang: string;

  @AutoMap()
  returnUrl: string;

  @AutoMap()
  isDemo: boolean;
}
