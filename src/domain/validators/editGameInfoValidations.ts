import { EditGameInformationViewModel } from '@/view/models';
import { UseValidationTranslationReturnValue } from '@atom/common';
import { date, number, object, SchemaOf, string } from 'yup';

export const editGameInfoValidations = async (
  t: UseValidationTranslationReturnValue
): Promise<
  SchemaOf<Omit<EditGameInformationViewModel, 'lastUpdatedUserId' | 'lastUpdatedUserEmail' | 'hasDemo' | 'hasFreeSpin'>>
> => {
  return object({
    name: string().trim().required(t.required()).max(50, t.max(50)),
    classId: number().nullable(),
    externalId: string()
      .trim()
      .max(100, t.max(100))
      .required(t.required())
      // eslint-disable-next-line no-useless-escape
      .matches(/^([0-9a-zA-Z()._\-])*$/, t.textInput()),
    gameId: number().nullable(),
    gameTypeId: number().nullable(),
    categoryId: number().nullable().required(t.required()),
    subTypeId: number().nullable(),
    releaseDate: date().nullable(),
    providerId: number().nullable()
  });
};
