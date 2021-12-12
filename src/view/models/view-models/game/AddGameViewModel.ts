import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class AddGameViewModel {
  @AutoMap()
  providerId: PrimaryKey;
  @AutoMap()
  externalId: string;
  @AutoMap()
  name: string;
  @AutoMap()
  releaseDate: string;
  @AutoMap()
  rtp: PrimaryKey | '';
  @AutoMap()
  volatilityId: PrimaryKey;
  @AutoMap()
  classId: PrimaryKey;
  @AutoMap()
  createdByUserId: PrimaryKey;
  @AutoMap()
  createdByUserEmail: string;

  hasDemo: '0' | '1';
  typeId: PrimaryKey;
  subTypeId: PrimaryKey;
}
