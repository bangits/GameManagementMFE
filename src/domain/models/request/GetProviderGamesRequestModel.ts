import { PagedModel, PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class GetProviderGamesRequestModel extends PagedModel {
  @AutoMap()
  providerId: PrimaryKey;

  typeId: PrimaryKey;
  filterName: string;
}
