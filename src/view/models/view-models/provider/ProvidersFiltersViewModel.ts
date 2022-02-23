import { ProviderStatusesEnum } from '@/domain/models/enums';
import { PagedModel, PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class ProvidersFiltersViewModel extends PagedModel {
  @AutoMap()
  providerId: PrimaryKey | '';

  @AutoMap()
  providerName: string;

  integrationTypeId: PrimaryKey;

  @AutoMap()
  partnerId: PrimaryKey | '';

  status: ProviderStatusesEnum[];
  currency: PrimaryKey[];
  gameCount: { from: number; to: number };
}
