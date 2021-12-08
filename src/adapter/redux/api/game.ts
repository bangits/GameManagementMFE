import { DI_CONSTANTS } from '@/di/constants';
import { GameUseCase } from '@/domain/use-case';
import { GamesFiltersViewModel } from '@/view/models';
import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../helpers';

export const gameApi = createApi({
  reducerPath: 'gameApi',
  baseQuery: createBaseQuery<GameUseCase>({ useCaseName: DI_CONSTANTS.GAME.GameUseCase }),
  endpoints: (build) => ({
    getGames: build.query({
      query: (gamesFiltersViewModel: GamesFiltersViewModel) => {
        return {
          methodName: 'getGames',
          methodArguments: [gamesFiltersViewModel]
        };
      }
    })
    // addGame: build.mutation({
    //   query: (addGameViewModel: AddGameViewModel) => {
    //     return {
    //       methodName: 'addGames',
    //       methodArguments: [addGameViewModel]
    //     };
    //   }
    // })
  })
});
