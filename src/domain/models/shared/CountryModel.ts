import { PrimaryKey } from '@atom/common';

export interface CountryModel {
  countryId: PrimaryKey;
  defaultCurrency?: boolean;
}
