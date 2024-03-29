import { DI_CONSTANTS } from '@/di/constants';
import { GameUseCase } from '@/domain/use-case';
import {
  AddGameViewModel,
  ChangeGameFreeSpinSupportViewModel,
  EditGameCompatibilityViewModel,
  EditGameInformationViewModel,
  EditGamePropertiesViewModel,
  GameLaunchViewModel,
  GamesDetailsViewModel,
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
  ProviderGamesViewModel,
  UpdateGameImagesViewModel
} from '@/view/models';
import { ChangeGameStatusViewModel } from '@/view/models/view-models/game/ChangeGameStatusViewModel';
import { ActionResponseModel, PrimaryKey } from '@atom/common';
import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../helpers';

export const gameApi = createApi({
  reducerPath: 'gameApi',
  baseQuery: createBaseQuery<GameUseCase>({ useCaseName: DI_CONSTANTS.GAME.GameUseCase }),
  tagTypes: ['Games', 'getGameById'],
  endpoints: (build) => ({
    getGames: build.query<GetGamesViewModel, {}>({
      query: (gamesFiltersViewModel: GamesFiltersViewModel) => {
        return {
          methodName: 'getGames',
          methodArguments: [gamesFiltersViewModel]
        };
      },
      providesTags: ['Games']
    }),
    getGameById: build.query<GamesDetailsViewModel, {}>({
      query: (partnerId: PrimaryKey) => {
        return {
          methodName: 'getGameById',
          methodArguments: [partnerId]
        };
      },
      providesTags: ['getGameById']
    }),
    addGame: build.mutation({
      query: (addGameViewModel: AddGameViewModel) => {
        return {
          methodName: 'addGame',
          methodArguments: [addGameViewModel]
        };
      },
      invalidatesTags: ['Games']
    }),
    getGameTypes: build.query<GetGameTypesViewModel, {}>({
      query: (parentTypeId?: PrimaryKey[]) => {
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
      },
      keepUnusedDataFor: 10
    }),
    launchGame: build.query<string, GameLaunchViewModel>({
      query: (gameLaunchViewModel: GameLaunchViewModel) => {
        return {
          methodName: 'gameLaunch',
          methodArguments: [gameLaunchViewModel]
        };
      }
    }),
    changeGameStatus: build.mutation<ActionResponseModel, {}>({
      query: (changeGameStatusViewModel: ChangeGameStatusViewModel) => {
        return {
          methodName: 'changeGameStatus',
          methodArguments: [changeGameStatusViewModel]
        };
      },
      invalidatesTags: ['Games']
    }),
    changeGameFreeSpinSupport: build.mutation<ActionResponseModel, ChangeGameFreeSpinSupportViewModel>({
      query: (changeGameFreeSpinSupportViewModel) => {
        return {
          methodName: 'changeGameFreeSpinSupport',
          methodArguments: [changeGameFreeSpinSupportViewModel]
        };
      },
      invalidatesTags: ['Games']
    }),
    editGameInformation: build.mutation<ActionResponseModel, {}>({
      query: (editGameInformationView: EditGameInformationViewModel) => {
        return {
          methodName: 'editGameInfo',
          methodArguments: [editGameInformationView]
        };
      },
      invalidatesTags: ['getGameById', 'Games']
    }),
    editGameProperties: build.mutation<ActionResponseModel, {}>({
      query: (editGamePropertiesView: EditGamePropertiesViewModel) => {
        return {
          methodName: 'editGameProperties',
          methodArguments: [editGamePropertiesView]
        };
      },
      invalidatesTags: ['getGameById', 'Games']
    }),
    editGameCompatibility: build.mutation<ActionResponseModel, {}>({
      query: (editGameCompatibilityView: EditGameCompatibilityViewModel) => {
        return {
          methodName: 'editGameCompatibility',
          methodArguments: [editGameCompatibilityView]
        };
      },
      invalidatesTags: ['getGameById', 'Games']
    }),
    updateImages: build.mutation<boolean, UpdateGameImagesViewModel>({
      query: (updateGameImagesViewModel: UpdateGameImagesViewModel) => {
        return {
          methodName: 'updateGameImages',
          methodArguments: [updateGameImagesViewModel]
        };
      },
      invalidatesTags: ['Games']
    })
  })
});
