import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class ProviderGameViewModel {
  @AutoMap()
  id: PrimaryKey;
  @AutoMap()
  icon: string;
  @AutoMap()
  name: string;
}
