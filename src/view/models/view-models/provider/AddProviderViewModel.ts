import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class AddProviderViewModel {
  @AutoMap()
  aggregator: PrimaryKey;

  @AutoMap()
  providerNames: string[];

  @AutoMap()
  absoluteDemoUrl: string;

  @AutoMap()
  absoluteRealUrl: string;
}
