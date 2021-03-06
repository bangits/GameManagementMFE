import { PrimaryKey } from '@atom/common';

export class PartnerProviderDetailsViewModel {
  providerId: PrimaryKey;

  totalGameCount: PrimaryKey;
  isActive: boolean;
  currencies: {
    title: string;
  }[];
  targetMarkets: {
    tagName: string;
    imgSrc: string;
  }[];
  certifiedCountries: {
    tagName: string;
    imgSrc: string;
  }[];
  restrictedCountries: {
    tagName: string;
    imgSrc: string;
  }[];
}
