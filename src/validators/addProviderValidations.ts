import { AddProviderViewModel } from '@/view/models';
import { array, number, object, SchemaOf, string } from 'yup';

export const addProviderValidationSchema: SchemaOf<AddProviderViewModel> = object({
  name: string().required('Required field').max(40, 'The maximum length is 40').min(7, 'The minimum symbols is 7'),
  logo: string().required('Required field'),
  providerCurrencies: array().of(number()).min(1, 'Required field').required('Required field'),
  defaultCurrency: number().min(1, 'Required field').required('Required field'),
  targetMarkets: array().of(number()),
  certifiedCountries: array().of(number()),
  restrictedCountries: array().of(number())
});
