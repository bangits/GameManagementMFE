import { EditGameInformationViewModel } from '@/view/models';
import { UseValidationTranslationReturnValue } from '@atom/common';
import { date, number, object, SchemaOf, string } from 'yup';

export const editGameInfoValidations = async (
  t: UseValidationTranslationReturnValue
): Promise<SchemaOf<Omit<EditGameInformationViewModel, 'lastUpdatedUserId' | 'lastUpdatedUserEmail' | 'hasDemo'>>> => {
  return object({
    name: string().required(t.required()).max(50, t.max(50)),
    classId: number().nullable(),
    externalId: string()
      .max(30, t.max(30))
      .required(t.required())
      // eslint-disable-next-line no-useless-escape
      .matches(/^([0-9a-zA-Z()._\-])*$/, t.textInput()),
    gameId: number().nullable(),
    subTypeId: number().nullable(),
    releaseDate: date().nullable(),
    providerId: number().nullable(),
    gameTypeId: number().nullable()
  });
};
