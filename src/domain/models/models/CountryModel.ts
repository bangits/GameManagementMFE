import { PrimaryKey } from '@/types';

export interface CountryModel {
  countryId: PrimaryKey;
  defaultCurrency?: boolean;
}
