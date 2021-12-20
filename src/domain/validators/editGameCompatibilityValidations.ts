import { EditGameCompatibilityViewModel } from '@/view/models';
import { UseValidationTranslationReturnValue } from '@atom/common';
import { array, number, object, SchemaOf } from 'yup';

export const editGameCompatibilityValidations = async (
    t: UseValidationTranslationReturnValue
): Promise<SchemaOf<Omit<EditGameCompatibilityViewModel, 'lastUpdatedByUserId' | 'platformIds' | 'mobileScreenModeIsPortrait' | 'mobileScreenModeIsLandscape' | 'lastUpdatedByUserEmail' | 'supportedBrowserIds' | 'tabletScreenModeIsLandscape' | 'hasDemo' | 'gameId' | 'tabletScreenModeIsPortrait'>>> => {
    return object({
        certifiedCountryIds: array().of(number()).nullable(),
        uiLanguageIds: array().of(number()).nullable(),
        supportedCurrencyIds: array().of(number()).nullable(),
        restrictedCountryIds: array().of(number()).nullable(),
        operatingLanguagesIds: array().of(number()).nullable(),
    });
};
