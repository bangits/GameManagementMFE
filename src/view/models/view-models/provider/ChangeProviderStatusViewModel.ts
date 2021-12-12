import { ProviderStatusesEnum } from '@/domain/models';
import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class ChangeProviderStatusViewModel {
  @AutoMap()
  providerIds: PrimaryKey[];
  @AutoMap()
  statusId: ProviderStatusesEnum;
}
