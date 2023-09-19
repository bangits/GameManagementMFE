import { EditGamePropertiesViewModel } from '@/view/models';
import { UseValidationTranslationReturnValue } from '@atom/common';
import { array, number, object, SchemaOf } from 'yup';

export const editGamePropertiesValidations = async (
  t: UseValidationTranslationReturnValue
): Promise<
  SchemaOf<Omit<EditGamePropertiesViewModel, 'lastUpdatedByUserEmail' | 'lastUpdatedByUserId' | 'gameId'>>
> => {
  let minBetValue;

  return object({
    minBet: number().nullable().min(0.01, t.minValue(0.01)),
    maxBet: number()
      .nullable()
      .min(0.01, t.minValue(0.01))
      .test({
        message: () => t.moreThan(minBetValue),
        test: (_, context) => {
          minBetValue = context.parent.minBet;
          return context.parent.minBet && context.parent.maxBet ? context.parent.minBet < context.parent.maxBet : true;
        }
      }),
    featureIds: array().of(number()).nullable(),
    maxWin: number().nullable(),
    rtp: number().max(100, t.maxValue(100)).min(0.1, t.minValue(0.1)).nullable(),
    themesIds: array().of(number()).nullable(),
    volatilityId: number().nullable()
  });
};
