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
  createdByUserEmail: string;

  subType: {
    id: PrimaryKey;
    name: string;
  };
  type: {
    id: PrimaryKey;
    name: string;
  };
  category: {
    id: PrimaryKey;
    name: string;
  };

  releaseDate: string;
  creationDate: string;
  statusId: GameStatusesEnum;

  gameId: PrimaryKey;
  class: number;
}
