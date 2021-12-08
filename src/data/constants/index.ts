export const PROVIDER_ROUTE = '/Providers';
export const GAME_ROUTE = '/Games';

export const API_ROUTES = {
  PROVIDERS: {
    BASE_ROUTE: PROVIDER_ROUTE,
    GET_PROVIDER_NAMES: PROVIDER_ROUTE + '/ProvidersName'
  },
  GAMES: {
    BASE_ROUTE: GAME_ROUTE,
    GET_GAME_TYPES: '/GameTypes',
    GET_CLASS_NAMES: '/Classes',
    GET_GAME_THEMES: '/Themes',
    GET_GAME_FEATURES: '/Feature',
    GET_GAME_VOLATILITIES: '/Volatility',
    GET_GAME_SUPPORTED_BROWSERS: '/SupportedBrowsers',

  }
};

export const CACHE_CONSTANTS = {
  GetProviderNamesResponse: 'GetProviderNamesResponse',
  GetGameTypesResponse: 'GetGameTypesResponse',
  GetClassNamesResponse: 'GetClassNamesResponse',
  GetGameThemesResponse: 'GetGameThemesResponse',
  GetGameFeaturesResponse: 'GetGameFeaturesResponse',
  GetGameVolatilitiesResponse: 'GetGameVolatilitiesResponse',
  GetGameSupportedBrowsersResponse: 'GetGameSupportedBrowsersResponse'
};
