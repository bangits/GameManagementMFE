import { PagedModel, PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';
import { GameStatusesEnum } from '..';
export class GetGameRequestModel extends PagedModel {
  @AutoMap()
  gameId: PrimaryKey;
  name: string;
  gameCountFrom: number;
  gameCountTo: number;
  statusIds: GameStatusesEnum[];
  gameDefaultCurrencyIds: number[];
}
