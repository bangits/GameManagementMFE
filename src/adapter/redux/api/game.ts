import { DI_CONSTANTS } from '@/di/constants';
import { GameUseCase } from '@/domain/use-case';
import {
  AddGameViewModel,
  GamesDetailsViewModel,
  GamesFiltersViewModel,
  GetClassNamesViewModel,
  GetGameFeaturesViewModel,
  GetGamePlatformsViewModel,
  GetGameSupportedBrowsersViewModel,
  GetGamesViewModel,
  GetGameThemesViewModel,
  GetGameTypesViewModel,
  GetGameVolatilitiesViewModel
} from '@/view/models';
import { PrimaryKey } from '@atom/common';
import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../helpers';

export const gameApi = createApi({
  reducerPath: 'gameApi',
  baseQuery: createBaseQuery<GameUseCase>({ useCaseName: DI_CONSTANTS.GAME.GameUseCase }),
  tagTypes: ['Games', 'GetGameById'],
  endpoints: (build) => ({
    getGames: build.query<GetGamesViewModel, {}>({
      query: (gamesFiltersViewModel: GamesFiltersViewModel) => {
        return {
          methodName: 'getGames',
          methodArguments: [gamesFiltersViewModel]
        };
      }
    }),
    getGameById: build.query<GamesDetailsViewModel, {}>({
      query: (partnerId: PrimaryKey) => {
        return {
          methodName: 'getGameById',
          methodArguments: [partnerId]
        };
      },
      providesTags: ['GetGameById']
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
    })
  })
});
