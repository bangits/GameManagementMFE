import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class AddProviderViewModel {
  @AutoMap()
  name: string;

  @AutoMap()
  logo: string;

  providerCurrencies: PrimaryKey[];
  defaultCurrency: PrimaryKey;
  targetMarkets: PrimaryKey[];
  certifiedCountries: PrimaryKey[];
  restrictedCountries: PrimaryKey[];
}
