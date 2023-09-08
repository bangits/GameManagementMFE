import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class EditGamePropertiesRequestModel {
  @AutoMap()
  rtp: PrimaryKey;

  @AutoMap()
  volatilityId: PrimaryKey;

  @AutoMap()
  maxWin: PrimaryKey;

  @AutoMap()
  gameId: PrimaryKey;

  @AutoMap()
  lastUpdatedByUserId: PrimaryKey;

  @AutoMap()
  lastUpdatedByUserEmail: string;

  @AutoMap()
  minBet: number;

  @AutoMap()
  maxBet: number;

  gameFeatures: {
    itemId: PrimaryKey;
  }[];
  themes: {
    itemId: PrimaryKey;
  }[];
}
