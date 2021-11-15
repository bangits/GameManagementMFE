import { ProviderStatusesEnum } from '@/models';
import { SortModel } from '@atom/common';

export interface GetProvidersViewModel extends SortModel {
  status: ProviderStatusesEnum[];
  currency: number[];
  gameCount: { from: number; to: number };
  providerId: number;
  providerName: string;
}
