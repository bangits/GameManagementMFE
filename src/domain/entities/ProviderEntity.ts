import { ProviderStatusesEnum } from '@/models';
import { BaseEntity } from './BaseEntity';

export interface Provider extends BaseEntity {
  name: string;
  logo: string;
  gameCount: number;
  lastUpdatedDate: string;
  creationDate: string;
  defaultCurrency: {
    id: number;
    name: string;
    code: string;
  };
  status: ProviderStatusesEnum;
}

export class ProviderEntity {
  constructor(public provider: Provider) {}
}
