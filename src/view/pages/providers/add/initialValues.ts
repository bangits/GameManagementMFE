import { AddProviderViewModel } from '@/view/models';

export const initialValues: AddProviderViewModel = {
  name: '',
  logo: '',
  providerCurrencies: [],
  defaultCurrency: 0,
  targetMarkets: [],
  restrictedCountries: [],
  certifiedCountries: []
};
