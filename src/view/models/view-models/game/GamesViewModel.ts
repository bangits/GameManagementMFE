import { GameStatusesEnum } from '@/domain/models';
import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class GamesViewModel {
  gameId: PrimaryKey;

  status: GameStatusesEnum;

  @AutoMap()
  logo: string;

  gameName: string;
  totalGameCount: number;
  defaultCurrency: string;
}
