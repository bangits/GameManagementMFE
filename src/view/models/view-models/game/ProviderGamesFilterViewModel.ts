import { PagedModel, PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class ProviderGamesFilterViewModel extends PagedModel {
  @AutoMap()
  providerId: PrimaryKey;

  gameSearch: string;
  gameTypeId: PrimaryKey;
}
