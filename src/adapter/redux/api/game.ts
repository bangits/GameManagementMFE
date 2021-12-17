import { DI_CONSTANTS } from '@/di/constants';
import { GameUseCase } from '@/domain/use-case';
import {
  AddGameViewModel,
  GameLaunchViewModel,
  GamesFiltersViewModel,
  GetClassNamesViewModel,
  GetGameFeaturesViewModel,
  GetGamePlatformsViewModel,
  GetGameSupportedBrowsersViewModel,
  GetGamesViewModel,
  GetGameThemesViewModel,
  GetGameTypesViewModel,
  GetGameVolatilitiesViewModel,
  ProviderGamesFilterViewModel,
  ProviderGamesViewModel
} from '@/view/models';
import { PrimaryKey } from '@atom/common';
import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../helpers';

export const gameApi = createApi({
  reducerPath: 'gameApi',
  baseQuery: createBaseQuery<GameUseCase>({ useCaseName: DI_CONSTANTS.GAME.GameUseCase }),
  endpoints: (build) => ({
    getGames: build.query<GetGamesViewModel, {}>({
      query: (gamesFiltersViewModel: GamesFiltersViewModel) => {
        return {
          methodName: 'getGames',
          methodArguments: [gamesFiltersViewModel]
        };
      }
    }),
    addGame: build.mutation({
      query: (addGameViewModel: AddGameViewModel) => {
        return {
          methodName: 'addGame',
          methodArguments: [addGameViewModel]
        };
      }
    }),
    getGameTypes: build.query<GetGameTypesViewModel, {}>({
      query: (parentTypeId?: PrimaryKey) => {
        return {
          methodName: 'getGameTypes',
          methodArguments: [parentTypeId]
        };
      }
    }),
    getClassNames: build.query<GetClassNamesViewModel, {}>({
      query: () => {
        return {
          methodName: 'getClassNames',
          methodArguments: []
        };
      }
    }),
    getGameThemes: build.query<GetGameThemesViewModel, {}>({
      query: () => {
        return {
          methodName: 'getGameThemes',
          methodArguments: []
        };
      }
    }),
    getGameFeatures: build.query<GetGameFeaturesViewModel, {}>({
      query: () => {
        return {
          methodName: 'getGameFeatures',
          methodArguments: []
        };
      }
    }),
    getGameSupportedBrowsers: build.query<GetGameSupportedBrowsersViewModel, {}>({
      query: () => {
        return {
          methodName: 'getGameSupportedBrowsers',
          methodArguments: []
        };
      }
    }),
    getGameVolatilities: build.query<GetGameVolatilitiesViewModel, {}>({
      query: () => {
        return {
          methodName: 'getGameVolatilities',
          methodArguments: []
        };
      }
    }),
    getGamePlatforms: build.query<GetGamePlatformsViewModel, {}>({
      query: () => {
        return {
          methodName: 'getGamePlatforms',
          methodArguments: []
        };
      }
    }),
    getGamesByProviderId: build.query<ProviderGamesViewModel, {}>({
      query: (providerGamesFilterViewModel: ProviderGamesFilterViewModel) => {
        return {
          methodName: 'getGamesByProviderId',
          methodArguments: [providerGamesFilterViewModel]
        };
      }
    }),
    launchGame: build.query<string, GameLaunchViewModel>({
      query: (gameLaunchViewModel: GameLaunchViewModel) => {
        return {
          methodName: 'gameLaunch',
          methodArguments: [gameLaunchViewModel]
        };
      }
    })
  })
});
