import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class ChangeGameFreeSpinSupportRequestModel {
  @AutoMap()
  gameIds: PrimaryKey[];

  @AutoMap()
  hasFreeSpinSupport: boolean;
}
