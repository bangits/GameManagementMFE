import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class EditGameInformationRequestModel {
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

  releaseDate: string;

  @AutoMap()
  gameId: PrimaryKey;

  @AutoMap()
  lastUpdatedUserId: PrimaryKey;

  @AutoMap()
  lastUpdatedUserEmail: string;
}
