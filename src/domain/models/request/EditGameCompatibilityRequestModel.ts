import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class EditGameCompatibilityRequestModel {
  @AutoMap()
  mobileScreenModeIsPortrait: boolean;

  @AutoMap()
  mobileScreenModeIsLandscape: boolean;
  @AutoMap()
  tabletScreenModeIsPortrait: boolean;

  @AutoMap()
  tabletScreenModeIsLandscape: boolean;
  @AutoMap()
  gameId: PrimaryKey;

  @AutoMap()
  lastUpdatedByUserId: PrimaryKey;

  @AutoMap()
  lastUpdatedByUserEmail: string;

  supportedBrowsers: {
    itemId: PrimaryKey;
  }[];

  gamePlatforms: {
    itemId: PrimaryKey;
  }[];

  supportedCurrencies: {
    currencyId: PrimaryKey;
    defaultCurrency: boolean;
  }[];

  uiLanguages: {
    itemId: PrimaryKey;
  }[];

  operatingLanguages: {
    itemId: PrimaryKey;
  }[];

  certifiedCountries: {
    itemId: PrimaryKey;
  }[];

  restrictedCountries: {
    itemId: PrimaryKey;
  }[];
}
