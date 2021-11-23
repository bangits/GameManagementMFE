import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';
import { ProviderStatusesEnum } from '../models';
import { BaseEntity } from './BaseEntity';

export class Provider extends BaseEntity {
  status: {
    id: ProviderStatusesEnum;
    name: string;
  };

  @AutoMap()
  logo: string;

  name: string;
  gameCount: number;
  lastUpdatedDate: string;
  creationDate: string;

  defaultCurrency?: {
    id: PrimaryKey;
    name: string;
    code: string;
  };
}
