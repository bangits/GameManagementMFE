import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class UpdateProviderLogoRequestModel {
  @AutoMap()
  logo: string;
  @AutoMap()
  providerId: PrimaryKey;

  lastUpdatedByUserId: PrimaryKey;
  lastUpdatedByUserEmail: string;
}
