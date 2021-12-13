import { GameStatusesEnum } from '@/domain/models/enums';
import { PagedModel, PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';
export class GetGameRequestModel extends PagedModel {
  @AutoMap()
  externalId: PrimaryKey;
  @AutoMap()
  icon: string;
  @AutoMap()
  name: string;
  @AutoMap()
  classIds: PrimaryKey;
  @AutoMap()
  volatilityIds: number;
  @AutoMap()
  gameThemeIds: PrimaryKey[];
  @AutoMap()
  gameFeatureIds: PrimaryKey[];
  @AutoMap()
  gamePlatformIds: PrimaryKey[];
  @AutoMap()
  gameId: PrimaryKey;
  @AutoMap()
  hasDemo: boolean;
  @AutoMap()
  createdByUserEmail: string;
  @AutoMap()
  gameCurrencyIds: PrimaryKey[];
  @AutoMap()
  gameSupportedBrowserIds: PrimaryKey[];
  @AutoMap()
  gameCertifiedCountries: PrimaryKey[];
  @AutoMap()
  gameRestrictedCountryIds: PrimaryKey[];
  @AutoMap()
  gameUiLanguageIds: PrimaryKey[];
  @AutoMap()
  gameOperatingLanguageIds: PrimaryKey[];
  @AutoMap()
  providerIds: PrimaryKey[];

  releaseDate: string;
  creationDate: string;
  parentTypeIds: PrimaryKey[];
  rtpFrom: number;
  rtpTo: number;
  statusId: GameStatusesEnum;
  subTypeId: PrimaryKey;
}
