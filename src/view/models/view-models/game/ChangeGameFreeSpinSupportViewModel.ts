import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class ChangeGameFreeSpinSupportViewModel {
  @AutoMap()
  gameIds: PrimaryKey[];

  @AutoMap()
  hasFreeSpinSupport: boolean;
}
