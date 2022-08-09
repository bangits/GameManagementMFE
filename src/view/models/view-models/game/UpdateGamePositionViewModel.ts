import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class UpdateGamePositionViewModel {
  @AutoMap()
  id: PrimaryKey;

  @AutoMap()
  categoryId: PrimaryKey;

  @AutoMap()
  position: number;
}
