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
  rtp: PrimaryKey;
  @AutoMap()
  volatilityId: PrimaryKey;
  @AutoMap()
  classId: PrimaryKey;
  @AutoMap()
  createdByUserId: PrimaryKey;
  @AutoMap()
  createdByUserEmail: string;

  hasDemo: boolean;
  subTypeId: PrimaryKey;
}
