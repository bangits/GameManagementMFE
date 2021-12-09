import { AddGameViewModel } from '@/view/models';
import { UseValidationTranslationReturnValue } from '@atom/common';
import { boolean, number, object, SchemaOf, string } from 'yup';

export const addGameValidationSchema = async (
  t: UseValidationTranslationReturnValue
): Promise<SchemaOf<AddGameViewModel>> => {
  return object({
    providerId: number().typeError(t.required()),
    externalId: string().max(30, t.max(30)).required(t.required()),
    name: string().required(t.required()).max(50, t.max(50)),
    subTypeId: number().typeError(t.required()),
    releaseDate: string(),
    rtp: number(),
    volatilityId: number(),
    classId: number(),
    hasDemo: boolean(),
    createdByUserEmail: string(),
    createdByUserId: number()
  });
};
