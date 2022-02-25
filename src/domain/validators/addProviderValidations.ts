import { AddProviderViewModel } from '@/view/models';
import { UseValidationTranslationReturnValue } from '@atom/common';
import { array, number, object, SchemaOf, string } from 'yup';

export const AddProviderValidationSchema = async (
  t: UseValidationTranslationReturnValue
): Promise<SchemaOf<Omit<AddProviderViewModel, 'license'>>> => {
  return object({
    aggregator: number().required(t.required()).nullable().max(40, t.max(40)),
    providerNames: array().required(t.textInput()),
    absoluteDemoUrl: string().trim(),
    absoluteRealUrl: string().trim()
  });
};
