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
  volatilityId: PrimaryKey;
  @AutoMap()
  classId: PrimaryKey;
  @AutoMap()
  createdByUserId: PrimaryKey;
  @AutoMap()
  createdByUserEmail: string;

  rtp: PrimaryKey | '';

  hasDemo: '0' | '1';
  categoryId?: PrimaryKey;
  typeId?: PrimaryKey;
  subTypeId: PrimaryKey;
}
