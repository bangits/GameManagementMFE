import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';
export class BaseEntity {
  @AutoMap()
  id: PrimaryKey;
}
