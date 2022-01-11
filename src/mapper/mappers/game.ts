import { Game } from '@/domain/entities';
import {
  AddGameRequestModel,
  ChangeGameStatusRequestModel,
  EditGameCompatibilityRequestModel,
  EditGameInformationRequestModel,
  EditGamePropertiesRequestModel,
  GameLaunchRequestModel,
  GetGameByIdResponseModel,
  GetGameRequestModel,
  GetGameResponseModel,
  UpdateImagesRequestModel
} from '@/domain/models';
import {
  AddGameViewModel,
  ChangeGameStatusViewModel,
  EditGameCompatibilityViewModel,
  EditGameInformationViewModel,
  EditGamePropertiesViewModel,
  GameLaunchViewModel,
  GamesDetailsViewModel,
  GamesFiltersViewModel,
  GamesViewModel,
  GetGamesViewModel,
  UpdateGameImagesViewModel
} from '@/view/models';
import { convertDate, convertDateForRequestModel } from '@atom/common';
import autoMapper, { Mapper } from '@automapper/core';

const { mapFrom, mapWith } = autoMapper;

export const generateGameMappings = (mapper: Mapper) => {
  //#region Get Game Filters Mapping
  mapper
    .createMap(GamesFiltersViewModel, GetGameRequestModel)
    .forMember(
      (destination) => destination.parentTypeIds,
      mapFrom((source) => (source.subTypeIds.length ? source.subTypeIds : [source.type]))
    )
    .forMember(
      (destination) => destination.statusId,
      mapFrom((source) => source.status)
    )
    .forMember(
      (destination) => destination.pagination,
      mapFrom((source) => source.pagination)
    )
    .forMember(
      (destination) => destination.sorting,
      mapFrom((source) => source.sorting)
    )
    .forMember(
      (destination) => destination.rtpFrom,
      mapFrom((source) => source.rtp.from)
    )
    .forMember(
      (destination) => destination.rtpTo,
      mapFrom((source) => source.rtp.to)
    )
    .forMember(
      (destination) => destination.createdByUserEmail,
      mapFrom((source) => source.createdBy)
    )
    .forMember(
      (destination) => destination.creationDateFrom,
      mapFrom((source) => source.creationDate[0] && convertDateForRequestModel(source.creationDate[0]))
    )
    .forMember(
      (destination) => destination.creationDateTo,
      mapFrom((source) => source.creationDate[1] && convertDateForRequestModel(source.creationDate[1]))
    )
    .forMember(
      (destination) => destination.releaseDateFrom,
      mapFrom((source) => source.releaseDate[0] && convertDateForRequestModel(source.releaseDate[0]))
    )
    .forMember(
      (destination) => destination.releaseDateTo,
      mapFrom((source) => source.releaseDate[1] && convertDateForRequestModel(source.releaseDate[1]))
    )
    .forMember(
      (destination) => destination.rtpTo,
      mapFrom((source) => source.rtp.to)
    );

  //#endregion

  //#region Get Game List Mapping
  mapper
    .createMap(Game, GamesViewModel)
    .forMember(
      (destination) => destination.gameId,
      mapFrom((source) => source.id)
    )
    .forMember(
      (destination) => destination.creationDate,
      mapFrom((source) => source.createdByUserEmail)
    )
    .forMember(
      (destination) => destination.statusId,
      mapFrom((source) => source.status.id)
    )
    .forMember(
      (destination) => destination.creationDate,
      mapFrom((source) => (source.creationDate ? `${convertDate(source.creationDate, 'MM/DD/YYYY HH:MM:SS')}` : 'N/A'))
    )
    .forMember(
      (destination) => destination.releaseDate,
      mapFrom((source) => (source.releaseDate ? `${convertDate(source.releaseDate, 'MM/DD/YYYY')}` : 'N/A'))
    );
  //#endregion

  //#region Get Game List Mapping
  mapper.createMap(GetGameResponseModel, GetGamesViewModel).forMember(
    (destination) => destination.results,
    mapWith(GamesViewModel, Game, (source) => source.results)
  );

  //#endregion

  //#region Add New Game Mapping
  mapper
    .createMap(AddGameViewModel, AddGameRequestModel)
    .forMember(
      (destination) => destination.hasDemo,
      mapFrom((source) => source.hasDemo === '1')
    )
    .forMember(
      (destination) => destination.subTypeId,
      mapFrom((source) => source.subTypeId || source.typeId)
    )
    .forMember(
      (destination) => destination.rtp,
      mapFrom((source) => +source.rtp || null)
    );

  //#endregion

  //#region Game Launch Mapping
  mapper
    .createMap(GameLaunchViewModel, GameLaunchRequestModel)
    .forMember(
      (destination) => destination.playerId,
      mapFrom((source) => source.userId)
    )
    .forMember(
      (destination) => destination.projectId,
      mapFrom((source) => 1)
    )
    .forMember(
      (destination) => destination.anon,
      mapFrom((source) => (source.isDemo ? 1 : null))
    )
    .forMember(
      (destination) => destination.anonOnly,
      mapFrom((source) => (source.isDemo ? 1 : null))
    )
    .forMember(
      (destination) => destination.providerId,
      mapFrom((source) => 1)
    );
  //#endregion

  //#region Upload Game Images Mapping
  mapper
    .createMap(UpdateGameImagesViewModel, UpdateImagesRequestModel)
    .forMember(
      (destination) => destination.lastUpdatedByUserEmail,
      mapFrom((source) => 'test@gmail․com')
    )
    .forMember(
      (destination) => destination.lastUpdatedByUserId,
      mapFrom((source) => 1)
    );
  //#endregion

  //#region Get Game Details Mapping
  mapper
    .createMap(GetGameByIdResponseModel, GamesDetailsViewModel)
    .forMember(
      (destination) => destination.gameId,
      mapFrom((source) => source.id)
    )
    .forMember(
      (destination) => destination.gameName,
      mapFrom((source) => source.name)
    )
    .forMember(
      (destination) => destination.statusId,
      mapFrom((source) => source.status.id)
    )
    .forMember(
      (destination) => destination.type,
      mapFrom((source) => source.type)
    )
    .forMember(
      (destination) => destination.subType,
      mapFrom((source) => source.subType)
    )
    .forMember(
      (destination) => destination.gameCurrencies,
      mapFrom((source) =>
        source.gameCurrencies.map((currency) => ({
          title: currency.code,
          id: currency.id
        }))
      )
    )
    .forMember(
      (destination) => destination.gameUILanguages,
      mapFrom((source) =>
        source.gameUILanguages.map((language) => ({
          title: language.name,
          id: language.id
        }))
      )
    )
    .forMember(
      (destination) => destination.gameOperatingLanguages,
      mapFrom((source) =>
        source.gameOperatingLanguages.map((language) => ({
          title: language.name,
          id: language.id
        }))
      )
    )
    .forMember(
      (destination) => destination.gameCertifiedCountries,
      mapFrom((source) =>
        source.gameCertifiedCountries.map((country) => ({
          tagName: country.name,
          id: country.id,
          imgURL: country.flag
        }))
      )
    )
    .forMember(
      (destination) => destination.gameRestrictedCountries,
      mapFrom((source) =>
        source.gameRestrictedCountries.map((countries) => ({
          tagName: countries.name,
          id: countries.id,
          imgURL: countries.flag
        }))
      )
    )
    .forMember(
      (destination) => destination.gamePlatformGames,
      mapFrom((source) =>
        source.gamePlatformGames.map((platform) => ({
          id: platform.id,
          name: platform.name
        }))
      )
    )
    .forMember(
      (destination) => destination.gameSupportedBrowsers,
      mapFrom((source) =>
        source.gameSupportedBrowsers.map((browser) => ({
          id: browser.id,
          name: browser.name
        }))
      )
    )
    .forMember(
      (destination) => destination.gameFeatures,
      mapFrom((source) =>
        source.gameFeatures.map((feature) => ({
          id: feature.id,
          name: feature.name
        }))
      )
    )
    .forMember(
      (destination) => destination.gameThemes,
      mapFrom((source) =>
        source.gameThemes.map((theme) => ({
          id: theme.id,
          name: theme.name
        }))
      )
    );
  //#endregion

  //#region Game Status Change Mapping
  mapper.createMap(ChangeGameStatusViewModel, ChangeGameStatusRequestModel);
  //#endregion

  //#region Edit Game Information Mapping
  mapper
    .createMap(EditGameInformationViewModel, EditGameInformationRequestModel)
    .forMember(
      (destination) => destination.subTypeId,
      mapFrom((source) => source.subTypeId || source.gameTypeId)
    )
    .forMember(
      (destination) => destination.hasDemo,
      mapFrom((source) => (source.hasDemo === '1' ? true : false))
    )
    .forMember(
      (destination) => destination.releaseDate,
      mapFrom((source) => convertDateForRequestModel(source.releaseDate))
    );

  //#endregion

  //#region Edit Game Properties Mapping
  mapper
    .createMap(EditGamePropertiesViewModel, EditGamePropertiesRequestModel)
    .forMember(
      (destination) => destination.gameFeatures,
      mapFrom((source) =>
        source.featureIds.map((featureId) => ({
          itemId: featureId
        }))
      )
    )
    .forMember(
      (destination) => destination.themes,
      mapFrom((source) =>
        source.themesIds.map((themeId) => ({
          itemId: themeId
        }))
      )
    );

  //#endregion

  //#region Edit Game Compatibility Mapping
  mapper
    .createMap(EditGameCompatibilityViewModel, EditGameCompatibilityRequestModel)
    .forMember(
      (destination) => destination.supportedBrowsers,
      mapFrom((source) =>
        source.supportedBrowserIds.map((id) => ({
          itemId: id
        }))
      )
    )
    .forMember(
      (destination) => destination.gamePlatforms,
      mapFrom((source) =>
        source.platformIds.map((id) => ({
          itemId: id
        }))
      )
    )
    .forMember(
      (destination) => destination.supportedCurrencies,
      mapFrom((source) =>
        source.supportedCurrencyIds.map((id) => ({
          currencyId: id,
          defaultCurrency: false
        }))
      )
    )
    .forMember(
      (destination) => destination.uiLanguages,
      mapFrom((source) =>
        source.uiLanguageIds.map((id) => ({
          itemId: id
        }))
      )
    )
    .forMember(
      (destination) => destination.operatingLanguages,
      mapFrom((source) =>
        source.operatingLanguagesIds.map((id) => ({
          itemId: id
        }))
      )
    )
    .forMember(
      (destination) => destination.certifiedCountries,
      mapFrom((source) =>
        source.certifiedCountryIds.map((id) => ({
          itemId: id
        }))
      )
    )
    .forMember(
      (destination) => destination.restrictedCountries,
      mapFrom((source) =>
        source.restrictedCountryIds.map((id) => ({
          itemId: id
        }))
      )
    );

  //#endregion
};
