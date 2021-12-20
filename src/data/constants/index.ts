export const PROVIDER_ROUTE = '/Providers';
export const GAME_ROUTE = '/Games';

export const API_ROUTES = {
  PROVIDERS: {
    BASE_ROUTE: PROVIDER_ROUTE,
    GET_PROVIDER_NAMES: PROVIDER_ROUTE + '/ProvidersName',
    CHANGE_STATUS: PROVIDER_ROUTE + '/UpdateStatus',
    PROVIDER_GET_GAME_TYPES: '/GameTypes/GetGameTypesAndCount',
    EDIT_GENERAL_INFORMATION: '/Providers',
    PARTNER_PROVIDER: PROVIDER_ROUTE + '/PartnerId'
  },
  GAMES: {
    BASE_ROUTE: GAME_ROUTE,
    GET_PROVIDER_GAMES: GAME_ROUTE + '/ProviderId',
    GET_GAME_TYPES: '/GameTypes',
    GET_CLASS_NAMES: '/Classes',
    GET_GAME_THEMES: '/Themes',
    GET_GAME_FEATURES: '/Feature',
    GET_GAME_VOLATILITIES: '/Volatility',
    GET_GAME_SUPPORTED_BROWSERS: '/SupportedBrowsers',
    GET_GAME_PLATFORMS: '/GamePlatform',
    LAUNCH_GAME: '/Rival/gameLaunch',
    CHANGE_STATUS: GAME_ROUTE + '/status',
    EDIT_GAME_INFO: GAME_ROUTE + '/Info',
    GET_BY_ID: GAME_ROUTE + '/id'
  }
};

export const CACHE_CONSTANTS = {
  GetProviderNamesResponse: 'GetProviderNamesResponse',
  GetGameTypesResponse: 'GetGameTypesResponse',
  GetClassNamesResponse: 'GetClassNamesResponse',
  GetGameThemesResponse: 'GetGameThemesResponse',
  GetGameFeaturesResponse: 'GetGameFeaturesResponse',
  GetGamePlatformsResponse: 'GetGamePlatformsResponse',
  GetGameVolatilitiesResponse: 'GetGameVolatilitiesResponse',
  GetGameSupportedBrowsersResponse: 'GetGameSupportedBrowsersResponse'
};
