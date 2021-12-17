import { GameStatusesEnum } from '@/domain/models';
import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class ChangeGameStatusRequestModel {
  @AutoMap()
  gameIds: PrimaryKey[];
  @AutoMap()
  statusId: GameStatusesEnum;
}
