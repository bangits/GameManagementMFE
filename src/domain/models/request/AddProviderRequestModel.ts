import { CountryModel } from '../CountryModel';

export interface AddProviderRequestModel {
  name: string;
  logo: string;
  providerCurrencies: CountryModel[];
  targetMarkets: CountryModel[];
  certifiedCountries: CountryModel[];
  restrictedCountries: CountryModel[];
}
