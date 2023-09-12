import { BaseEntity, Country, Currency, PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';
import { GameStatusesEnum } from '../models';
export class Game extends BaseEntity {
  @AutoMap()
  externalId: PrimaryKey;

  @AutoMap()
  icon: string;

  @AutoMap()
  name: string;

  @AutoMap()
  providerId: PrimaryKey;

  @AutoMap()
  rtp: PrimaryKey;

  @AutoMap()
  className: PrimaryKey;

  @AutoMap()
  providerName: string;

  @AutoMap()
  volatilityName: string;

  @AutoMap()
  createdByUserEmail: string;

  @AutoMap()
  backGroundImage: string;

  @AutoMap()
  creationDate: string;

  @AutoMap()
  classId: PrimaryKey;

  @AutoMap()
  volatilityId: PrimaryKey;

  @AutoMap()
  hasDemo: boolean;

  @AutoMap()
  mobileScreenModeIsPortrait: boolean;

  @AutoMap()
  mobileScreenModeIsLandscape: boolean;

  @AutoMap()
  tabletScreenModeIsPortrait: boolean;

  @AutoMap()
  tabletScreenModeIsLandscape: boolean;

  @AutoMap()
  lastUpdatedByUserEmail: string;

  @AutoMap()
  lastUpdatedDate: string;

  @AutoMap()
  maxWin: PrimaryKey;

  @AutoMap()
  providerAbsoluteUrl: string;

  @AutoMap()
  providerDemoUrl: string;

  @AutoMap()
  providerAbsoluteDemoUrl: string;

  @AutoMap()
  minBet: number;

  @AutoMap()
  maxBet: number;

  releaseDate: string;

  status: {
    id: GameStatusesEnum;
    name: string;
  };

  type: {
    id: PrimaryKey;
    name: string;
    parentType?: {
      id: PrimaryKey;
      name: string;
      parentType?: {
        id: PrimaryKey;
        name: string;
        parentType: null;
      };
    };
  };
  gameCurrencies: Currency[];
  gameUILanguages: {
    id: PrimaryKey;
    name: string;
  }[];
  gameOperatingLanguages: {
    id: PrimaryKey;
    name: string;
  }[];
  gameCertifiedCountries: Country[];
  gameRestrictedCountries: Country[];
  gamePlatformGames: {
    id: PrimaryKey;
    name: string;
  }[];
  gameSupportedBrowsers: {
    id: PrimaryKey;
    name: string;
  }[];
  gameFeatures: {
    id: PrimaryKey;
    name: string;
  }[];
  gameThemes: {
    id: PrimaryKey;
    name: string;
  }[];
}
