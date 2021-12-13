import { PrimaryKey } from "@atom/common";
import { AutoMap } from "@automapper/classes";

export class ChangeGameStatusRequestModel {
    @AutoMap()
    gameIds: PrimaryKey[];

    @AutoMap()
    statusId: PrimaryKey;

    @AutoMap()
    lastUpdatedByUserId: PrimaryKey;

    @AutoMap()
    lastUpdatedByUserEmail: string
}