import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class GetGameTypesAndCountResponseModel {
  @AutoMap()
  id: PrimaryKey;

  @AutoMap()
  name: string;

  @AutoMap()
  gameCount: number;
}
