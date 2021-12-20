import { EditGamePropertiesViewModel } from '@/view/models';
import { UseValidationTranslationReturnValue } from '@atom/common';
import { array, number, object, SchemaOf } from 'yup';

export const editGamePropertiesValidations = async (
    t: UseValidationTranslationReturnValue
): Promise<SchemaOf<Omit<EditGamePropertiesViewModel, 'lastUpdatedByUserEmail' | 'lastUpdatedByUserId' | 'gameId'>>> => {
    return object({
        featureIds: array().of(number()).nullable(),
        maxWin: number().nullable(),
        rtp: number().max(99, t.maxValue(99)).min(0.1, t.min(0.1)).nullable(),
        themesIds: array().of(number()).nullable(),
        volatilityId: number().nullable(),
    });
};
