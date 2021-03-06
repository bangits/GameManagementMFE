import { BaseEntity, Country, Currency, PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';
import { ProviderStatusesEnum } from '../models';

export class Provider extends BaseEntity {
  status: {
    id: ProviderStatusesEnum;
    name: string;
  };

  @AutoMap()
  logo: string;

  @AutoMap()
  partnerId: PrimaryKey;

  @AutoMap()
  providerId: PrimaryKey;

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
  targetMarkets: Country[];
  providerCurrencies: Currency[];
  certifiedCountries: Country[];
  restrictedCountries: Country[];
  providerLicenses: Country[];

  absoluteUrl: string;
  absoluteDemoUrl: string;
  createdByUserId: PrimaryKey;
  createdByUserEmail: string;
  lastUpdatedByUserId: PrimaryKey;
  lastUpdatedByUserEmail: string;
}
