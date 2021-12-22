import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class UpdateGameImagesViewModel {
  @AutoMap()
  gameId: PrimaryKey;
  @AutoMap()
  icon: string;
  @AutoMap()
  backGroundImage: string;
}
