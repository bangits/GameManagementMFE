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
  providerIds: PrimaryKey | '';
  @AutoMap()
  classId: PrimaryKey | '';
  @AutoMap()
  releaseDate: string;
  @AutoMap()
  creationDate: string;
  @AutoMap()
  volatilityId: PrimaryKey | '';
  @AutoMap()
  gameThemes: String[];
  @AutoMap()
  gameFeatures: String[];
  @AutoMap()
  gamePlatformGames: String[];
  @AutoMap()
  gameId: PrimaryKey | '';
  @AutoMap()
  createdBy: string;
  
  restrictedCountries: string[] | '';
  certifiedCountries: String[] | '';
  supportedCurrencies: String[] | '';
  rtp: { from: number | ''; to: number | '' };
  subType: PrimaryKey | '';
  status: GameStatusesEnum;
}
