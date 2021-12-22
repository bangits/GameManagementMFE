import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class UpdateProviderLogoViewModel {
  @AutoMap()
  logo: string;
  @AutoMap()
  providerId: PrimaryKey;
}
