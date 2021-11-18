import { AddProviderViewModel } from '@/models';
import { UseValidationTranslationReturnValue } from '@atom/common';
import { array, number, object, SchemaOf, string } from 'yup';

export const getLoginValidationSchema = async (
  t: UseValidationTranslationReturnValue
): Promise<SchemaOf<AddProviderViewModel>> => {
  return object({
    name: string().required(t.required()).max(40,t.max(40)).min(7, t.min(6)),
    logo: string().required(t.required()),
    providerCurrencies: array().of(number()).min(1, t.required()).required(t.required()),
    defaultCurrency: number().min(1, t.required()).required(t.required()),
    targetMarkets: array().of(number()),
    certifiedCountries: array().of(number()),
    restrictedCountries: array().of(number())
  });
};