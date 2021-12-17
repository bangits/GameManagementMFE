import { PrimaryKey } from "@atom/common";
import { AutoMap } from "@automapper/classes";

export class EditProviderGeneralInformationRequestModel {
    @AutoMap()
    providerId: PrimaryKey;

    @AutoMap()
    logo: string;

    @AutoMap()
    absoluteDemoUrl: string;

    @AutoMap()
    lastUpdatedByUserId: PrimaryKey;

    @AutoMap()
    lastUpdatedByUserEmail: string;

    providerCurrencies: {
        currencyId: PrimaryKey;
        defaultCurrency: boolean;
    }[]

    absoluteUrl: string;
    
    providerLicenses: {
        licenseId: PrimaryKey;
    }[];

    targetMarkets: {
        countryId: PrimaryKey;
    }[]

    certifiedCountries: {
        countryId: PrimaryKey;
    }[]

    restrictedCountries: {
        countryId: PrimaryKey;
    }[]    
}