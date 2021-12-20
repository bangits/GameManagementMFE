import { PrimaryKey } from "@atom/common";
import { AutoMap } from "@automapper/classes";

export class EditGameCompatibilityViewModel {

    @AutoMap()
    mobileScreenModeIsPortrait: boolean;

    @AutoMap()
    mobileScreenModeIsLandscape: boolean
        ;
    @AutoMap()
    tabletScreenModeIsPortrait: boolean;

    @AutoMap()
    tabletScreenModeIsLandscape: boolean
        ;
    @AutoMap()
    gameId: PrimaryKey;

    @AutoMap()
    lastUpdatedByUserId: PrimaryKey;

    @AutoMap()
    lastUpdatedByUserEmail: string;

    supportedBrowserIds: PrimaryKey[];

    platformIds: PrimaryKey[];

    supportedCurrencyIds: PrimaryKey[];

    uiLanguageIds: PrimaryKey[];

    operatingLanguagesIds: PrimaryKey[];

    certifiedCountryIds: PrimaryKey[];

    restrictedCountryIds: PrimaryKey[];

}