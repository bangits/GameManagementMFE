import { GameStatusesEnum } from '@/domain/models';
import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class GamesDetailsViewModel {
  @AutoMap()
  providerId: PrimaryKey;

  @AutoMap()
  rtp: PrimaryKey;

  @AutoMap()
  className: string;

  @AutoMap()
  providerName: string;

  @AutoMap()
  volatilityName: string;

  @AutoMap()
  externalId: string;

  @AutoMap()
  icon: string;

  @AutoMap()
  backGroundImage: string;

  @AutoMap()
  releaseDate: string;

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
  lastUpdatedDate: string;

  @AutoMap()
  lastUpdatedByUserEmail: string;

  @AutoMap()
  maxWin: PrimaryKey;

  @AutoMap()
  createdByUserEmail: string;

  @AutoMap()
  providerAbsoluteUrl: string;

  @AutoMap()
  providerAbsoluteDemoUrl: string;

  gameName: string;
  gameId: PrimaryKey;
  statusId: GameStatusesEnum;

  type: {
    name: string;
    id: PrimaryKey;
  };
  subType: {
    name: string;
    id: PrimaryKey;
  };
  gameCurrencies: {
    id: PrimaryKey;
    title: string;
  }[];

  gameUILanguages: {
    id: PrimaryKey;
    title: string;
  }[];
  gameOperatingLanguages: {
    id: PrimaryKey;
    title: string;
  }[];
  gameCertifiedCountries: {
    id: PrimaryKey;
    tagName: string;
    imgURL: string;
  }[];
  gameRestrictedCountries: {
    id: PrimaryKey;
    tagName: string;
    imgURL: string;
  }[];
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
