import { DI_CONSTANTS } from '@/di/constants';
import { GameUseCase } from '@/domain/use-case';
import {
  GamesFiltersViewModel,
  GetClassNamesViewModel,
  GetGameFeaturesViewModel,
  GetGamesViewModel,
  GetGameThemesViewModel,
  GetGameTypesViewModel
} from '@/view/models';
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

    // addGame: build.mutation({
    //   query: (addGameViewModel: AddGameViewModel) => {
    //     return {
    //       methodName: 'addGames',
    //       methodArguments: [addGameViewModel]
    //     };
    //   }
    // })

    getGameTypes: build.query<GetGameTypesViewModel, {}>({
      query: () => {
        return {
          methodName: 'getGameTypes',
          methodArguments: []
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
    })
  })
});
