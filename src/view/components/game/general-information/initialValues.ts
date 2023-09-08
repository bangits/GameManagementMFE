import {
  EditGameCompatibilityViewModel,
  EditGameInformationViewModel,
  EditGamePropertiesViewModel,
  GamesDetailsViewModel
} from '@/view/models';

export const getEditGameInfoInitialValues = (data: GamesDetailsViewModel): EditGameInformationViewModel => {
  return {
    classId: data.classId || null,
    externalId: data.externalId || null,
    gameId: data.gameId || null,
    hasDemo: data.hasDemo ? '1' : '0',
    lastUpdatedUserEmail: data.lastUpdatedByUserEmail || null,
    lastUpdatedUserId: 1,
    name: data.gameName,
    releaseDate: data.releaseDate && new Date(data.releaseDate),
    categoryId: data.category?.id,
    gameTypeId: data.type?.id || null,
    subTypeId: data.subType?.id || null,
    providerId: data.providerId
  };
};
export const getEditGamePropertiesValues = (data: GamesDetailsViewModel): EditGamePropertiesViewModel => {
  return {
    featureIds: data.gameFeatures.map((featureId) => featureId.id) || null,
    gameId: data.gameId || null,
    lastUpdatedByUserEmail: data.lastUpdatedByUserEmail || null,
    lastUpdatedByUserId: 1,
    maxWin: data.maxWin || null,
    minBet: data.minBet,
    maxBet: data.maxBet,
    rtp: data.rtp || null,
    themesIds: data.gameThemes.map((theme) => theme.id) || null,
    volatilityId: data.volatilityId || null
  };
};
export const getEditGameCompatibilityValues = (data: GamesDetailsViewModel): EditGameCompatibilityViewModel => {
  return {
    certifiedCountryIds: data.gameCertifiedCountries?.map((country) => country.id) || [],
    gameId: data.gameId || null,
    lastUpdatedByUserEmail: data.lastUpdatedByUserEmail || null,
    lastUpdatedByUserId: 1,
    mobileScreenModeIsLandscape: data.mobileScreenModeIsLandscape || false,
    mobileScreenModeIsPortrait: data.mobileScreenModeIsPortrait || false,
    operatingLanguagesIds: data.gameOperatingLanguages.map((language) => language.id),
    platformIds: data.gamePlatformGames.map((platform) => platform.id),
    restrictedCountryIds: data.gameRestrictedCountries.map((country) => country.id),
    supportedBrowserIds: data.gameSupportedBrowsers.map((browser) => browser.id),
    supportedCurrencyIds: data.gameCurrencies?.map((currency) => currency.id) || [],
    tabletScreenModeIsLandscape: data.tabletScreenModeIsLandscape || false,
    tabletScreenModeIsPortrait: data.tabletScreenModeIsPortrait || false,
    uiLanguageIds: data.gameUILanguages?.map((language) => language.id) || []
  };
};
