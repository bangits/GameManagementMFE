import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class ProviderGamesResponseModel {
  @AutoMap()
  id: PrimaryKey;
  @AutoMap()
  name: string;
  @AutoMap()
  icon: string;
}
