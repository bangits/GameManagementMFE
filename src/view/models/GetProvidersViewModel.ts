import { ProviderStatusesEnum } from '@/domain/entities';

export interface GetProvidersViewModel {
  status: ProviderStatusesEnum[];
  currency: number;
  gameCount: { from: number; to: number };
  providerId: number;
}
