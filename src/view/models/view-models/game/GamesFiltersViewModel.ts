import { GameStatusesEnum } from '@/domain/models/enums';
import { PagedModel, PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class GamesFiltersViewModel extends PagedModel {
  @AutoMap()
  gameId: PrimaryKey;

  status: GameStatusesEnum[];
  currency: PrimaryKey[];
  gameCount: { from: number; to: number };
  gameName: string;
}
