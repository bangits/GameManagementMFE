import { ProviderStatusesEnum } from '@/domain/models/enums';
import { PrimaryKey, SortModel } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class ProvidersFiltersViewModel extends SortModel {
  @AutoMap()
  providerId: PrimaryKey;

  status: ProviderStatusesEnum[];
  currency: PrimaryKey[];
  gameCount: { from: number; to: number };
  providerName: string;
}
