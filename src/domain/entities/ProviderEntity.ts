import { BaseEntity } from './BaseEntity';
import { ProviderStatus } from './ProviderStatusesEntity';

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
  status: ProviderStatus;
}

export class ProviderEntity {
  constructor(public provider: Provider) {}
}
