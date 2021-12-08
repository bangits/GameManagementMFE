import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';
import { GameStatusesEnum } from '../models';
import { BaseEntity } from './BaseEntity';

export class Game extends BaseEntity {
  @AutoMap()
  externalId: PrimaryKey;
  @AutoMap()
  icon: string;
  @AutoMap()
  name: string;
  @AutoMap()
  providerId: PrimaryKey;
  @AutoMap()
  rtp: number;
  @AutoMap()
  classId: PrimaryKey;
  @AutoMap()
  releaseDate: string;
  @AutoMap()
  creationDate: string;

  typeId: PrimaryKey;
  providerName: string;
  status: GameStatusesEnum;
  volatility: PrimaryKey;
  subType: PrimaryKey;
}

