import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class UpdateImagesRequestModel {
  @AutoMap()
  gameId: PrimaryKey;
  @AutoMap()
  icon: string;
  @AutoMap()
  backGroundImage: string;

  lastUpdatedByUserId: PrimaryKey;
  lastUpdatedByUserEmail: string;
}
