import { Country, Currency, PrimaryKey } from '@atom/common';

export class GetProviderByPartnerIdResponseModel {
  id: PrimaryKey;

  gameCount: PrimaryKey;

  integrationTypeName: string;

  targetMarkets: Country[];
  providerCurrencies: Currency[];
  certifiedCountries: Country[];
  restrictedCountries: Country[];
  providerLicenses: Country[];
}
