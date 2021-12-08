import { ProviderStatusesEnum } from '@/domain/models';
import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class ProvidersViewModel {
  providerId: PrimaryKey;

  status: ProviderStatusesEnum;

  @AutoMap()
  logo: string;

  @AutoMap()
  partnerId: PrimaryKey;

  providerName: string;
  totalGameCount: number;
  defaultCurrency: string;
}
