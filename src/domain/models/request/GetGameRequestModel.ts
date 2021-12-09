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
  providerIds: PrimaryKey;
  @AutoMap()
  classId: PrimaryKey;
  @AutoMap()
  releaseDate: string;
  @AutoMap()
  creationDate: string;
  @AutoMap()
  volatilityId: number;
  @AutoMap()
  gameThemes: String[];
  @AutoMap()
  gameFeatures: String[];
  @AutoMap()
  gamePlatformGames: String[];
  @AutoMap()
  gameId: PrimaryKey;
  @AutoMap()
  createdByUserEmail: string;

  gameCertifiedCountries: String[];
  gameRestrictedCountryIds: String[] | '';
  gameCurrencyIds: String[] | '';

  rtpFrom: number;
  rtpTo: number;
  statusId: GameStatusesEnum;
  subTypeId: PrimaryKey;
}
