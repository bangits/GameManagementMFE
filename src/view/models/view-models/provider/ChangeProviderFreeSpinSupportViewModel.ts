import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class ChangeProviderFreeSpinSupportViewModel {
  @AutoMap()
  providerIds: PrimaryKey[];

  @AutoMap()
  hasFreeSpinSupport: boolean;
}
