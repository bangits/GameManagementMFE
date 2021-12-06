import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';
import { GameStatusesEnum } from '../models';
import { BaseEntity } from './BaseEntity';

export class Game extends BaseEntity {
  status: {
    id: GameStatusesEnum;
    name: string;
  };

  @AutoMap()
  logo: string;

  name: string;
  gameCount: number;
  lastUpdatedDate: string;
  creationDate: string;

  defaultCurrency?: {
    id: PrimaryKey;
    name: string;
    code: string;
  };
}
