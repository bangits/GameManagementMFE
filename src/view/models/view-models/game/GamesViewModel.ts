import { GameStatusesEnum } from '@/domain/models';
import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class GamesViewModel {
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

  gameId: PrimaryKey;
  class: number;
}
