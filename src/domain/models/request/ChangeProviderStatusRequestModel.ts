import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';
import { ProviderStatusesEnum } from '..';

export class ChangeProviderStatusRequestModel {
  @AutoMap()
  providerIds: PrimaryKey[];

  @AutoMap()
  statusId: ProviderStatusesEnum;

  lastUpdatedByUserId: PrimaryKey;
  lastUpdatedByUserEmail: string;
}
