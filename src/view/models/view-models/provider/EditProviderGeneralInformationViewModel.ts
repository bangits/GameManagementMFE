import { PrimaryKey } from "@atom/common";
import { AutoMap } from "@automapper/classes";

export class EditProviderGeneralInformationViewModel {
    @AutoMap()
    providerId: PrimaryKey;

    @AutoMap()
    lastUpdatedByUserId: PrimaryKey;

    @AutoMap()
    lastUpdatedByUserEmail: string;

    @AutoMap()
    absoluteDemoUrl: string;

    @AutoMap()
    logo: string;


    providerCurrenciesId: PrimaryKey[];
    targetMarketsId: PrimaryKey[];
    certifiedCountriesId: PrimaryKey[];
    restrictedCountriesId: PrimaryKey[];
    licensesId: PrimaryKey[];

    absoluteRealUrl: string;
}