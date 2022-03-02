import { ProviderFormValues } from '@/view/pages';
import { UseValidationTranslationReturnValue } from '@atom/common';
import { object, SchemaOf, string } from 'yup';

export const getAddProviderFormsValidationSchema = async (
  t: UseValidationTranslationReturnValue
): Promise<SchemaOf<ProviderFormValues>> => {
  return object({
    providerExternalId: string()
      .trim()
      .max(30, t.max(30))
      // eslint-disable-next-line no-useless-escape
      .matches(/^([0-9a-zA-Z()_\-])*$/, t.textInput())
      .required(t.required()),
    providerName: string().required(t.required()).max(40, t.max(40))
  });
};
