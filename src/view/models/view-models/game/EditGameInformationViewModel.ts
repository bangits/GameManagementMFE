import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class EditGameInformationViewModel {
  @AutoMap()
  name: string;

  @AutoMap()
  externalId: string;

  @AutoMap()
  subTypeId: PrimaryKey;

  @AutoMap()
  providerId: PrimaryKey;

  @AutoMap()
  classId: PrimaryKey;

  @AutoMap()
  hasDemo: boolean;

  @AutoMap()
  hasFreeSpin: boolean;

  releaseDate: Date;

  @AutoMap()
  gameId: PrimaryKey;

  @AutoMap()
  lastUpdatedUserId: PrimaryKey;

  @AutoMap()
  lastUpdatedUserEmail: string;

  categoryId: PrimaryKey;

  gameTypeId: PrimaryKey;
}
