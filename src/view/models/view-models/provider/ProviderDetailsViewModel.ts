import { ProviderStatusesEnum } from '@/domain/models';
import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class ProviderDetailsViewModel {
  @AutoMap()
  logo: string;

  @AutoMap()
  partnerId: PrimaryKey;

  providerId: PrimaryKey;

  @AutoMap()
  partnerName: string;

  @AutoMap()
  integrationTypeName: string;

  @AutoMap()
  id: PrimaryKey;

  targetMarkets: {
    tagName: string;
    id: PrimaryKey;
    imgSrc: string;
  }[];
  providerCurrencies: {
    title: string;
    id: PrimaryKey;
  }[];
  certifiedCountries: {
    tagName: string;
    id: PrimaryKey;
    imgSrc: string;
  }[];
  restrictedCountries: {
    tagName: string;
    id: PrimaryKey;
    imgSrc: string;
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
