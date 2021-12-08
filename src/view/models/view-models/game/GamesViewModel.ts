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
  classId: PrimaryKey;
  @AutoMap()
  releaseDate: string;
  @AutoMap()
  creationDate: string;

  status: {
    id: GameStatusesEnum;
    name: string;
  };

  gameId: PrimaryKey;
  volatilityId: number;
  subType: PrimaryKey;
  class: number;
}
