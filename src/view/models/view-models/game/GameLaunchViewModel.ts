import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class GameLaunchViewModel {
  userId: PrimaryKey;

  @AutoMap()
  currencyId: PrimaryKey;

  @AutoMap()
  currency: string;

  @AutoMap()
  gameId: PrimaryKey | string;

  gameExternalId: PrimaryKey | string;

  @AutoMap()
  providerId: PrimaryKey;

  @AutoMap()
  providerName: string;

  @AutoMap()
  projectId: PrimaryKey;

  @AutoMap()
  gameLaunchUrl: string;

  @AutoMap()
  lang: string;

  @AutoMap()
  returnUrl: string;

  @AutoMap()
  isDemo: boolean;

  gameBackground: string;
}
