import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class EditGamePropertiesViewModel {

    @AutoMap()
    rtp: PrimaryKey;

    @AutoMap()
    volatilityId: PrimaryKey;

    @AutoMap()
    maxWin: PrimaryKey;

    @AutoMap()
    gameId: PrimaryKey;

    @AutoMap()
    lastUpdatedByUserId: PrimaryKey;

    @AutoMap()
    lastUpdatedByUserEmail: string;


    featureIds: PrimaryKey[];
    themesIds: PrimaryKey[];
}