import { AddGameViewModel } from '@/view/models';
import { UseValidationTranslationReturnValue } from '@atom/common';
import { number, object, SchemaOf, string } from 'yup';

export const addGameValidationSchema = async (
  t: UseValidationTranslationReturnValue
): Promise<SchemaOf<Omit<AddGameViewModel, 'hasDemo'>>> => {
  return object({
    providerId: number().typeError(t.required()),
    externalId: string()
      .trim()
      .max(100, t.max(100))
      .required(t.required())
      // eslint-disable-next-line no-useless-escape
      .matches(/^([0-9a-zA-Z()_\- ])*$/, t.textInput()),
    name: string().trim().required(t.required()).max(50, t.max(50)),
    categoryId: number().typeError(t.required()).required(t.required()),
    typeId: number().nullable(),
    subTypeId: number().nullable(),
    releaseDate: string().nullable(),
    rtp: number().max(100, t.maxValue(100)).min(0.1, t.min(0.1)).nullable(),
    volatilityId: number().nullable(),
    classId: number().typeError(t.required()),
    createdByUserEmail: string(),
    createdByUserId: number()
  });
};
