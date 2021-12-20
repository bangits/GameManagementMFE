import { PrimaryKey } from "@atom/common";
import { AutoMap } from "@automapper/classes";

export class EditGamePropertiesRequestModel {
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


    gameFeatures:
        {
            itemId: PrimaryKey;
        }[]
    themes:
        {
            itemId: PrimaryKey;
        }[]
}