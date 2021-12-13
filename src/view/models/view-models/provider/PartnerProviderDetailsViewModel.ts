import { PrimaryKey } from '@atom/common';

export class PartnerProviderDetailsViewModel {
  providerId: PrimaryKey;

  totalGameCount: PrimaryKey;

  currencies: {
    title: string;
  }[];
  targetMarkets: {
    tagName: string;
  }[];
  certifiedCountries: {
    tagName: string;
  }[];
  restrictedCountries: {
    tagName: string;
  }[];
}
