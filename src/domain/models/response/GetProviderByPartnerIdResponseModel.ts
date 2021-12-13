import { Country, Currency, PrimaryKey } from '@atom/common';

export class GetProviderByPartnerIdResponseModel {
  id: PrimaryKey;

  gameCount: PrimaryKey;

  targetMarkets: Country[];
  providerCurrencies: Currency[];
  certifiedCountries: Country[];
  restrictedCountries: Country[];
  providerLicenses: Country[];
}
