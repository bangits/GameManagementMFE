export const PROVIDER_ROUTE = '/Providers';
export const GAME_ROUTE = '/Games';

export const API_ROUTES = {
  PROVIDERS: {
    BASE_ROUTE: PROVIDER_ROUTE,
    GET_PROVIDER_NAMES: PROVIDER_ROUTE + '/ProvidersName'
  },
  GAMES: {
    BASE_ROUTE: GAME_ROUTE
  }
};

export const CACHE_CONSTANTS = {
  GetProviderNamesResponse: 'GetProviderNamesResponse'
};
