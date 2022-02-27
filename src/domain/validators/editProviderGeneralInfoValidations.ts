import { EditProviderGeneralInformationViewModel } from '@/view/models';
import { regexLibrary, UseValidationTranslationReturnValue } from '@atom/common';
import { array, number, object, SchemaOf, string } from 'yup';

export const editProviderGeneralInfoValidations = async (
  t: UseValidationTranslationReturnValue
): Promise<
  SchemaOf<
    Omit<
      EditProviderGeneralInformationViewModel,
      'providerId' | 'lastUpdatedByUserId' | 'lastUpdatedByUserEmail' | 'logo'
    >
  >
> => {
  return object({
    absoluteDemoUrl: string().trim().nullable().max(200, t.max(200)).matches(regexLibrary.WEB_SITE, t.website()),
    absoluteRealUrl: string().trim().nullable().max(200, t.max(200)).matches(regexLibrary.WEB_SITE, t.website()),
    certifiedCountriesId: array().of(number()).nullable(),
    licensesId: array().of(number()).nullable(),
    restrictedCountriesId: array().of(number()).nullable(),
    targetMarketsId: array().of(number()).nullable(),
    providerCurrenciesId: array().of(number()).nullable()
  });
};
