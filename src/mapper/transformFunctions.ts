import { CountryModel, PrimaryKey } from '@atom/common';

export const transformToCountryModel = (array: PrimaryKey[], defaultCountryId?: PrimaryKey): CountryModel[] =>
  array.map((countryId) => ({ countryId, defaultCurrency: countryId === defaultCountryId }));
