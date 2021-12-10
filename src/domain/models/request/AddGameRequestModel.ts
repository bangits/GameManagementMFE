import { CountryModel } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class AddGameRequestModel {
  @AutoMap()
  name: string;

  @AutoMap()
  logo: string;

  providerCurrencies: CountryModel[];
  targetMarkets: CountryModel[];
  certifiedCountries: CountryModel[];
  restrictedCountries: CountryModel[];
}
