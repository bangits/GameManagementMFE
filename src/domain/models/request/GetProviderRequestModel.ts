import { PagedModel, PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';
import { ProviderStatusesEnum } from '..';
export class GetProviderRequestModel extends PagedModel {
  @AutoMap()
  providerId: PrimaryKey;

  @AutoMap()
  partnerId: PrimaryKey;

  @AutoMap()
  providerName: string;

  IntegrationTypeId: PrimaryKey;

  name: string;
  gameCountFrom: number;
  gameCountTo: number;
  statusIds: ProviderStatusesEnum[];
  providerDefaultCurrencyIds: number[];
}
