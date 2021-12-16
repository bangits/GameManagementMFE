import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class ProviderGamesTypesViewModel {
  @AutoMap()
  id: PrimaryKey;

  @AutoMap()
  name: string;

  @AutoMap()
  gameCount: number;
}
