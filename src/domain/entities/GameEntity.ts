import { Country, Currency, PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';
import { GameStatusesEnum } from '../models';
import { BaseEntity } from './BaseEntity';

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
  rtp: number;
  @AutoMap()
  className: PrimaryKey;
  @AutoMap()
  providerName: string;
  @AutoMap()
  volatilityName: string;
  @AutoMap()
  subTypeName: string;
  @AutoMap()
  typeName: string;
  @AutoMap()
  createdByUserEmail: string;

  releaseDate: string;
  creationDate: string;
  status: {
    id: GameStatusesEnum;
    name: string;
  };

  classId: PrimaryKey;
  hasDemo: boolean;
  mobileScreenModeIsPortrait: boolean;
  mobileScreenModeIsLandscape: boolean;
  tabletScreenModeIsPortrait: boolean;
  tabletScreenModeIsLandscape: boolean;
  volatilityId: PrimaryKey;
  backGroundImage: string;
  lastUpdatedByUserEmail: string;
  lastUpdatedDate: string;
  maxWin: string;
  type: {
    id: PrimaryKey;
    name: string;
  };
  subType: {
    id: PrimaryKey;
    name: string;
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
