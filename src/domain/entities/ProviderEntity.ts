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

  @AutoMap()
  partnerId: PrimaryKey;

  name: string;
  gameCount: number;
  lastUpdatedDate: string;
  creationDate: string;

  defaultCurrency?: {
    id: PrimaryKey;
    name: string;
    code: string;
  };

  //Provider Details
  targetMarkets: {
    id: PrimaryKey;
    name: string;
    isoCode: string;
  }[];
  providerCurrencies: {
    id: PrimaryKey;
    name: string;
    code: string;
    symbol: string;
  }[];
  certifiedCountries: {
    id: PrimaryKey;
    name: string;
    isoCode: string;
  }[];
  restrictedCountries: {
    id: PrimaryKey;
    name: string;
    isoCode: string;
  }[];
  providerLicenses: {
    id: PrimaryKey;
    name: string;
  }[];
  absoluteUrl: string;
  absoluteDemoUrl: string;
  createdByUserId: PrimaryKey;
  createdByUserEmail: string;
  lastUpdatedByUserId: PrimaryKey;
  lastUpdatedByUserEmail: string;
}
