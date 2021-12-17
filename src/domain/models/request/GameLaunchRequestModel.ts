import { PrimaryKey } from '@atom/common';

export class GameLaunchRequestModel {
  playerId: PrimaryKey;
  projectId: PrimaryKey;
  providerId: PrimaryKey;
  gameId: PrimaryKey;
  currencyId: PrimaryKey;
  currency: string;
  gameLaunchUrl: string;
}
