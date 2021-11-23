import { PrimaryKey, SortModel } from '@atom/common';
import { AutoMap } from '@automapper/classes';
import { ProviderStatusesEnum } from '..';
export class GetProviderRequestModel extends SortModel {
  @AutoMap()
  providerId: PrimaryKey;

  name: string;
  gameCountFrom: number;
  gameCountTo: number;
  statusIds: ProviderStatusesEnum[];
  providerDefaultCurrencyIds: number[];
}
