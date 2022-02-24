import { GameStatusesEnum } from '@/domain/models';
import { PagedModel, PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class GamesFiltersViewModel extends PagedModel {
  @AutoMap()
  externalId: PrimaryKey | '';
  
  @AutoMap()
  icon: string;
  @AutoMap()
  name: string;

  @AutoMap()
  classIds: PrimaryKey | '';
  @AutoMap()
  volatilityIds: PrimaryKey | '';
  @AutoMap()
  gameThemeIds: String[];
  @AutoMap()
  gameFeatureIds: String[];
  @AutoMap()
  gamePlatformIds: String[];
  @AutoMap()
  hasDemo: boolean;
  @AutoMap()
  gameId: PrimaryKey | '';
  @AutoMap()
  createdBy: string;
  @AutoMap()
  gameCurrencyIds: String[] | '';
  @AutoMap()
  gameSupportedBrowserIds: String[] | '';
  @AutoMap()
  gameCertifiedCountries: String[];
  @AutoMap()
  gameRestrictedCountryIds: String[] | '';
  @AutoMap()
  gameUiLanguageIds: String[] | '';
  @AutoMap()
  gameOperatingLanguageIds: String[] | '';
  @AutoMap()
  providerIds: String[] | '';

  releaseDate: [Date, Date];
  creationDate: [Date, Date];

  rtp: { from: number | ''; to: number | '' };
  type: PrimaryKey | '';
  subTypeIds: PrimaryKey[];
  status: GameStatusesEnum;
}
