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
  className: PrimaryKey;
  @AutoMap()
  providerName: string;
  @AutoMap()
  volatilityName: string;
  @AutoMap()
  subTypeName: string;
  @AutoMap()
  typeName: string;
  @AutoMap()
  createdByUserEmail: string;

  releaseDate: string;
  creationDate: string;
  status: GameStatusesEnum;
}
