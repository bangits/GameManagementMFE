import { PrimaryKey } from '@atom/common';
import { Country, Currency } from '@atom/common/dist/domain/entities';
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
