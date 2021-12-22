import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class AddGameRequestModel {
  @AutoMap()
  providerId: PrimaryKey;
  @AutoMap()
  externalId: string;
  @AutoMap()
  name: string;
  @AutoMap()
  releaseDate: string;
  @AutoMap()
  volatilityId: PrimaryKey;
  @AutoMap()
  classId: PrimaryKey;
  @AutoMap()
  createdByUserId: PrimaryKey;
  @AutoMap()
  createdByUserEmail: string;

  rtp: PrimaryKey;
  hasDemo: boolean;
  subTypeId: PrimaryKey;
}
