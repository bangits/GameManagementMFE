import { PrimaryKey } from '@/types';

export interface AddProviderViewModel {
  name: string;
  logo: string;
  providerCurrencies: PrimaryKey[];
  defaultCurrency: PrimaryKey;
  targetMarkets: PrimaryKey[];
  certifiedCountries: PrimaryKey[];
  restrictedCountries: PrimaryKey[];
}
