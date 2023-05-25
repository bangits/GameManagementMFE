import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class ChangeProviderFreeSpinSupportRequestModel {
  @AutoMap()
  providerIds: PrimaryKey[];

  @AutoMap()
  hasFreeSpinSupport: boolean;
}
