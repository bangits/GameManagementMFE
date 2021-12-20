import { Game, Provider } from '@/domain/entities';
import {
  AddGameRequestModel,
  AddProviderRequestModel,
  ChangeGameStatusRequestModel,
  ChangeProviderStatusRequestModel,
  EditGameCompatibilityRequestModel,
  EditGameInformationRequestModel,
  EditGamePropertiesRequestModel,
  EditProviderGeneralInformationRequestModel,
  GameLaunchRequestModel,
  GetGameByIdResponseModel,
  GetGameRequestModel,
  GetGameResponseModel,
  GetProviderByPartnerIdResponseModel,
  GetProviderGamesRequestModel,
  GetProviderGamesResponseModel,
  GetProviderRequestModel,
  GetProviderResponseModel,
  GetProvidersByIdResponseModel,
  ProviderGamesResponseModel
} from '@/domain/models';
import {
  AddGameViewModel,
  AddProviderViewModel,
  ChangeGameStatusViewModel,
  ChangeProviderStatusViewModel, EditGameCompatibilityViewModel, EditGameInformationViewModel,
  EditGamePropertiesViewModel,
  EditProviderGeneralInformationViewModel,
  GameLaunchViewModel,
  GamesDetailsViewModel,
  GamesFiltersViewModel,
  GamesViewModel,
  GetGamesViewModel,
  GetProviderByPartnerIdViewModel,
  GetProvidersViewModel,
  ProviderGamesFilterViewModel,
  ProviderGamesViewModel,
  ProviderGameViewModel,
  ProvidersFiltersViewModel,
  ProvidersViewModel
} from '@/view/models';
import { convertDate, convertDateForRequestModel } from '@atom/common';
import autoMapper, { MappingProfile } from '@automapper/core';
import { GetProvidersByIdViewModel } from './../view/models/view-models/provider/GetProvidersByIdViewModel';
import { convertToCountryTab, transformToCountryModel } from './transformFunctions';

const { mapFrom, mapWith } = autoMapper;

export const baseProfile: MappingProfile = (mapper) => {
  //#region Providers
  mapper
    .createMap(ProvidersFiltersViewModel, GetProviderRequestModel)
    .forMember(
      (destination) => destination.gameCountFrom,
      mapFrom((source) => source.gameCount.from)
    )
    .forMember(
      (destination) => destination.gameCountTo,
      mapFrom((source) => source.gameCount.to)
    )
    .forMember(
      (destination) => destination.providerDefaultCurrencyIds,
      mapFrom((source) => source.currency)
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
      (destination) => destination.statusIds,
      mapFrom((source) => source.status)
    );

  mapper
    .createMap(Provider, ProvidersViewModel)
    .forMember(
      (destination) => destination.defaultCurrency,
      mapFrom((source) => source.defaultCurrency?.code || null)
    )
    .forMember(
      (destination) => destination.status,
      mapFrom((source) => source.status.id)
    )
    .forMember(
      (destination) => destination.providerId,
      mapFrom((source) => source.id)
    )
    .forMember(
      (destination) => destination.providerName,
      mapFrom((source) => source.name)
    )
    .forMember(
      (destination) => destination.totalGameCount,
      mapFrom((source) => source.gameCount)
    );

  mapper
    .createMap(AddProviderViewModel, AddProviderRequestModel)
    .forMember(
      (destination) => destination.certifiedCountries,
      mapFrom((source) => transformToCountryModel(source.certifiedCountries))
    )
    .forMember(
      (destination) => destination.providerCurrencies,
      mapFrom((source) => transformToCountryModel(source.providerCurrencies, source.defaultCurrency))
    )
    .forMember(
      (destination) => destination.restrictedCountries,
      mapFrom((source) => transformToCountryModel(source.restrictedCountries))
    )
    .forMember(
      (destination) => destination.targetMarkets,
      mapFrom((source) => transformToCountryModel(source.targetMarkets))
    );

  mapper
    .createMap(ChangeProviderStatusViewModel, ChangeProviderStatusRequestModel)
    .forMember(
      (destination) => destination.lastUpdatedByUserId,
      mapFrom((source) => 1)
    )
    .forMember(
      (destination) => destination.lastUpdatedByUserEmail,
      mapFrom((source) => 'aaaaa@aaaa.aaa')
    );

  mapper
    .createMap(GetProvidersByIdResponseModel, GetProvidersByIdViewModel)
    .forMember(
      (destination) => destination.targetMarkets,
      mapFrom((source) => convertToCountryTab(source.targetMarkets))
    )
    .forMember(
      (destination) => destination.providerCurrencies,
      mapFrom((source) =>
        source.providerCurrencies.map((currency) => ({
          title: currency.name,
          id: currency.id
        }))
      )
    )
    .forMember(
      (destination) => destination.certifiedCountries,
      mapFrom((source) => convertToCountryTab(source.certifiedCountries))
    )
    .forMember(
      (destination) => destination.restrictedCountries,
      mapFrom((source) => convertToCountryTab(source.restrictedCountries))
    )
    .forMember(
      (destination) => destination.statusId,
      mapFrom((source) => source.status.id)
    )
    .forMember(
      (destination) => destination.providerLicenses,
      mapFrom((source) =>
        source.providerLicenses.map((license) => ({
          title: license.name,
          id: license.id
        }))
      )
    )
    .forMember(
      (destination) => destination.providerName,
      mapFrom((source) => source.name)
    )
    .forMember(
      (destination) => destination.gameCount,
      mapFrom((source) => source.gameCount)
    )
    .forMember(
      (destination) => destination.absoluteUrl,
      mapFrom((source) => source.absoluteUrl)
    )
    .forMember(
      (destination) => destination.absoluteDemoUrl,
      mapFrom((source) => source.absoluteDemoUrl)
    )
    .forMember(
      (destination) => destination.createdByUserId,
      mapFrom((source) => source.createdByUserId)
    )
    .forMember(
      (destination) => destination.creationDate,
      mapFrom((source) => `${convertDate(source.creationDate)}`)
    )
    .forMember(
      (destination) => destination.createdByUserEmail,
      mapFrom((source) => source.createdByUserEmail)
    )
    .forMember(
      (destination) => destination.lastUpdatedByUserId,
      mapFrom((source) => source.lastUpdatedByUserId)
    )
    .forMember(
      (destination) => destination.lastUpdatedDate,
      mapFrom((source) => source.lastUpdatedDate)
    )
    .forMember(
      (destination) => destination.lastUpdatedByUserEmail,
      mapFrom((source) => source.lastUpdatedByUserEmail)
    )
    .forMember(
      (destination) => destination.providerId,
      mapFrom((source) => source.id)
    );

  //# Get Partner Provider Details
  mapper
    .createMap(GetProviderByPartnerIdResponseModel, GetProviderByPartnerIdViewModel)
    .forMember(
      (destination) => destination.totalGameCount,
      mapFrom((source) => source.gameCount)
    )
    .forMember(
      (destination) => destination.providerId,
      mapFrom((source) => source.id)
    )
    .forMember(
      (destination) => destination.currencies,
      mapFrom((source) =>
        source.providerCurrencies.map((currencies) => ({
          title: currencies.name
        }))
      )
    )
    .forMember(
      (destination) => destination.targetMarkets,
      mapFrom((source) =>
        source.targetMarkets.map((market) => ({
          tagName: market.name,
          imgSrc: market.flag
        }))
      )
    )
    .forMember(
      (destination) => destination.certifiedCountries,
      mapFrom((source) =>
        source.certifiedCountries.map((countries) => ({
          tagName: countries.name,
          imgSrc: countries.flag
        }))
      )
    )
    .forMember(
      (destination) => destination.restrictedCountries,
      mapFrom((source) =>
        source.restrictedCountries.map((countries) => ({
          tagName: countries.name,
          imgSrc: countries.flag
        }))
      )
    );
  //#endregion

  //#region Games
  mapper.createMap(GetProviderResponseModel, GetProvidersViewModel).forMember(
    (destination) => destination.results,
    mapWith(ProvidersViewModel, Provider, (source) => source.results)
  );

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
      mapFrom((source) => (source.creationDate ? `${convertDate(source.creationDate, 'DD/MM/YYYY HH:MM:SS')}` : 'N/A'))
    )
    .forMember(
      (destination) => destination.releaseDate,
      mapFrom((source) => (source.releaseDate ? `${convertDate(source.releaseDate, 'DD/MM/YYYY')}` : 'N/A'))
    );

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
      mapFrom((source) => source.rtp || null)
    );

  mapper.createMap(GetGameResponseModel, GetGamesViewModel).forMember(
    (destination) => destination.results,
    mapWith(GamesViewModel, Game, (source) => source.results)
  );

  mapper
    .createMap(ProviderGamesFilterViewModel, GetProviderGamesRequestModel)
    .forMember(
      (destination) => destination.pagination,
      mapFrom((source) => source.pagination)
    )
    .forMember(
      (destination) => destination.filterName,
      mapFrom((source) => source.gameSearch)
    )
    .forMember(
      (destination) => destination.typeId,
      mapFrom((source) => source.gameTypeId)
    );

  mapper.createMap(ProviderGamesResponseModel, ProviderGameViewModel).forMember(
    (destination) => destination.id,
    mapFrom((source) => source.id)
  );

  mapper.createMap(GetProviderGamesResponseModel, ProviderGamesViewModel).forMember(
    (destination) => destination.results,
    mapWith(ProviderGameViewModel, ProviderGamesResponseModel, (source) => source.results)
  );

  //# Edit Provider View
  mapper
    .createMap(EditProviderGeneralInformationViewModel, EditProviderGeneralInformationRequestModel)
    .forMember(
      (destination) => destination.absoluteUrl,
      mapFrom((source) => source.absoluteRealUrl)
    )
    .forMember(
      (destination) => destination.providerLicenses,
      mapFrom((source) =>
        source.licensesId.map((licenseId) => ({
          licenseId
        }))
      )
    )
    .forMember(
      (destination) => destination.targetMarkets,
      mapFrom((source) =>
        source.targetMarketsId.map((countryId) => ({
          countryId
        }))
      )
    )
    .forMember(
      (destination) => destination.certifiedCountries,
      mapFrom((source) =>
        source.certifiedCountriesId.map((countryId) => ({
          countryId
        }))
      )
    )
    .forMember(
      (destination) => destination.restrictedCountries,
      mapFrom((source) =>
        source.restrictedCountriesId.map((countryId) => ({
          countryId
        }))
      )
    )
    .forMember(
      (destination) => destination.providerCurrencies,
      mapFrom((source) =>
        source.providerCurrenciesId.map((currency) => ({
          currencyId: currency,
          defaultCurrency: false
        }))
      )
    );

  //# Game Launch
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
      (destination) => destination.providerId,
      mapFrom((source) => 1)
    );

  //#Get Games By Id
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
          title: currency.name,
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
  mapper.createMap(ChangeGameStatusViewModel, ChangeGameStatusRequestModel);

  mapper
    .createMap(EditGameInformationViewModel, EditGameInformationRequestModel)
    .forMember(
      (destination) => destination.subTypeId,
      mapFrom((source) => source.gameTypeId)
    )
    .forMember(
      (destination) => destination.subTypeId,
      mapFrom((source) => source.subTypeId)
    )
    .forMember(
      (destination) => destination.hasDemo,
      mapFrom((source) => (source.hasDemo === '1' ? true : false))
    )
    .forMember(
      (destination) => destination.releaseDate,
      mapFrom((source) => convertDateForRequestModel(source.releaseDate))
    );

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
          itemId: id,
        }))
      )
    )
    .forMember(
      (destination) => destination.operatingLanguages,
      mapFrom((source) =>
        source.operatingLanguagesIds.map((id) => ({
          itemId: id,
        }))
      )
    )
    .forMember(
      (destination) => destination.certifiedCountries,
      mapFrom((source) =>
        source.certifiedCountryIds.map((id) => ({
          itemId: id,
        }))
      )
    )
    .forMember(
      (destination) => destination.restrictedCountries,
      mapFrom((source) =>
        source.restrictedCountryIds.map((id) => ({
          itemId: id,
        }))
      )
    )
};
