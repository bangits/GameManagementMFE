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
    tagName: string;
    id: PrimaryKey;
  }[];
  providerCurrencies: {
    title: string;
    id: PrimaryKey;
  }[];
  certifiedCountries: {
    tagName: string;
    id: PrimaryKey;
  }[];
  restrictedCountries: {
    tagName: string;
    id: PrimaryKey;
  }[];
  providerLicenses: {
    title: string;
    id: PrimaryKey;
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
