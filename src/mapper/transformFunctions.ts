import { CountryModel, PrimaryKey } from '@atom/common';

export const transformToCountryModel = (array: PrimaryKey[], defaultCountryId?: PrimaryKey): CountryModel[] =>
  array.map((countryId) => ({ countryId, defaultCurrency: countryId === defaultCountryId }));

export const convertToCountryTab = (transformModel: { flag: string; id: PrimaryKey; name: string }[]) =>
  transformModel?.map((model) => ({
    tagName: model.name,
    id: model.id,
    imgSrc: model.flag
  })) || [];
