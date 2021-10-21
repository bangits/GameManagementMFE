import { AddProviderViewModel } from '@/models';
import { object, SchemaOf, string, number, array, boolean } from 'yup';

export const addProviderValidationSchema: SchemaOf<AddProviderViewModel> = object({
  name: string().required('Required field').max(40, 'The maximum length is 40').min(7, 'The minimum symbols is 7'),
  logo: string().required('Required field'),
  providerCurrencies: array().of(number()).required('Required field'),
  defaultCurrency: number().required('Required field'),
  targetMarkets: array().of(number()),
  certifiedCountries: array().of(number()),
  restrictedCountries: array().of(number())
});
