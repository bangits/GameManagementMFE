import { AddProviderViewModel } from '@/view/models';
import { regexLibrary, UseValidationTranslationReturnValue } from '@atom/common';
import { array, number, object, SchemaOf, string } from 'yup';

export const getAddProviderValidationSchema = async (
  t: UseValidationTranslationReturnValue
): Promise<SchemaOf<AddProviderViewModel>> => {
  return object({
    partnerId: number().required(t.required()).nullable(),
    partnerName: string().trim(),
    providers: array()
      .of(
        object({
          id: number(),
          externalId: string(),
          providerName: string()
        })
      )
      .min(1, t.required()),
    absoluteDemoUrl: string().trim().nullable().max(200, t.max(200)).matches(regexLibrary.WEB_SITE, t.website()),
    absoluteRealUrl: string().trim().nullable().max(200, t.max(200)).matches(regexLibrary.WEB_SITE, t.website())
  });
};
