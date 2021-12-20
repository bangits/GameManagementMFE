import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class ProviderGameViewModel {
  @AutoMap()
  id: PrimaryKey;
  @AutoMap()
  icon: string;
  @AutoMap()
  name: string;
  @AutoMap()
  externalId: string;
  @AutoMap()
  backGroundImage: string;
  @AutoMap()
  providerAbsoluteDemoUrl: string;
  @AutoMap()
  providerAbsoluteUrl: string;
  @AutoMap()
  hasDemo: boolean;
}
