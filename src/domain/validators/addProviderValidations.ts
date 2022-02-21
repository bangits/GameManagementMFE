import { AddProviderViewModel } from '@/view/models';
import { UseValidationTranslationReturnValue } from '@atom/common';
import { array, number, object, SchemaOf, string } from 'yup';

export const AddProviderValidationSchema = async (
  t: UseValidationTranslationReturnValue
): Promise<SchemaOf<Omit<AddProviderViewModel, 'license'>>> => {
  return object({
    aggregator: number().required(t.required()).nullable(),
    providerNames: array().required(t.required()),
    absoluteDemoUrl: string(),
    absoluteRealUrl: string()
  });
};
