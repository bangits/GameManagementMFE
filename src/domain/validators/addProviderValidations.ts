import { AddProviderViewModel } from '@/view/models';
import { UseValidationTranslationReturnValue } from '@atom/common';
import { array, number, object, SchemaOf, string } from 'yup';

export const AddProviderValidationSchema = async (
  t: UseValidationTranslationReturnValue
): Promise<SchemaOf<AddProviderViewModel>> => {
  return object({
    partnerId: number().required(t.required()).nullable(),
    partnerName: string(),
    providers: array().of(
      object({
        id: number(),
        externalId: string(),
        providerName: string()
      })
    ),
    absoluteDemoUrl: string(),
    absoluteRealUrl: string()
  });
};
