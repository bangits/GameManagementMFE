import { ProviderStatusesEnum } from '@/domain/models';
import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class ProviderDetailsViewModel {
  @AutoMap()
  logo: string;

  @AutoMap()
  partnerId: PrimaryKey;

  @AutoMap()
  id: PrimaryKey;

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
  status: {
    id: ProviderStatusesEnum;
    name: string;
  };
  providerLicenses: {
    id: PrimaryKey;
    name: string;
  }[];

  name: string;
  gameCount: PrimaryKey;
  absoluteUrl: string;
  absoluteDemoUrl: string;
  createdByUserId: PrimaryKey;
  creationDate: string;
  createdByUserEmail: string;
  lastUpdatedByUserId: PrimaryKey;
  lastUpdatedDate: string;
  lastUpdatedByUserEmail: string;
}
