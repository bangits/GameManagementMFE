import { ProviderStatusesEnum } from '@/domain/models/enums';
import { PagedModel, PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class ProvidersFiltersViewModel extends PagedModel {
  @AutoMap()
  providerId: PrimaryKey;

  status: ProviderStatusesEnum[];
  currency: PrimaryKey[];
  gameCount: { from: number; to: number };
  providerName: string;
}
