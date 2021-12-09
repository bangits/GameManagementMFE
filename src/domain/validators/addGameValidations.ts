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
    rtp: number().max(10, t.max(10)),
    volatilityId: number(),
    classId:number().typeError(t.required()),
    hasDemo: boolean().required(t.required()),
    createdByUserEmail: string(),
    createdByUserId: number()
  });
};
