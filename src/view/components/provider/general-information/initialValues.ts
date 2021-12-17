import { EditProviderGeneralInformationViewModel, ProviderDetailsViewModel } from "@/view/models";

export const editProviderGeneralInfoInitialValues = (
    data: ProviderDetailsViewModel
): Omit<EditProviderGeneralInformationViewModel, 'providerId'> => {
    return {
        absoluteDemoUrl: data.absoluteDemoUrl || null,
        absoluteRealUrl: data.absoluteUrl || null,
        certifiedCountriesId: data.certifiedCountries.map(country => country.id) || null,
        lastUpdatedByUserEmail: data.lastUpdatedByUserEmail || null,
        lastUpdatedByUserId: data.lastUpdatedByUserId || null,
        licensesId: data.providerLicenses.map(license => license.id) || null,
        providerCurrenciesId: data.providerCurrencies.map(currency => (currency.id)) || null,
        restrictedCountriesId: data.restrictedCountries.map(country => country.id) || null,
        targetMarketsId: data.targetMarkets.map(markets => markets.id),
        logo: data.logo || 'there is not a logo',
    };
};