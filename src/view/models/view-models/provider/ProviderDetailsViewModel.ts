import { ProviderStatusesEnum } from '@/domain/models';
import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class ProviderDetailsViewModel {
  @AutoMap()
  logo: string;

  @AutoMap()
  partnerId: PrimaryKey;

  @AutoMap()
  providerId: PrimaryKey;

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
  providerLicenses: {
    id: PrimaryKey;
    name: string;
  }[];

  statusId: ProviderStatusesEnum;

  providerName: string;
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
