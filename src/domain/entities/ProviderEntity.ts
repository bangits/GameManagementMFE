import { ProviderStatusesEnum } from '@/models';
import { PrimaryKey } from '@atom/common';
import { BaseEntity } from './BaseEntity';

export interface Provider extends BaseEntity {
  name: string;
  logo: string;
  gameCount: number;
  lastUpdatedDate: string;
  creationDate: string;
  defaultCurrency: {
    id: PrimaryKey;
    name: string;
    code: string;
  };
  status: ProviderStatusesEnum;
}

export class ProviderEntity {
  constructor(public provider: Provider) {}
}
