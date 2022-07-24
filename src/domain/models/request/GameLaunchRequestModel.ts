import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class GameLaunchRequestModel {
  playerId: string;
  projectId: PrimaryKey;

  device: string;
  browser: string;

  @AutoMap()
  currencyId: PrimaryKey;

  @AutoMap()
  currency: string;

  @AutoMap()
  gameId: PrimaryKey | string;

  externalGameId: PrimaryKey | string;

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
