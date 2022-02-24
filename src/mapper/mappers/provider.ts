import { Provider } from '@/domain/entities';
import {
  AddProviderRequestModel,
  ChangeProviderStatusRequestModel,
  EditProviderGeneralInformationRequestModel,
  GetProviderByPartnerIdResponseModel,
  GetProviderGamesRequestModel,
  GetProviderGamesResponseModel,
  GetProviderRequestModel,
  GetProviderResponseModel,
  GetProvidersByIdResponseModel,
  ProviderGamesResponseModel,
  UpdateProviderLogoRequestModel
} from '@/domain/models';
import {
  AddProviderViewModel,
  ChangeProviderStatusViewModel,
  EditProviderGeneralInformationViewModel,
  GetProviderByPartnerIdViewModel,
  GetProvidersByIdViewModel,
  GetProvidersViewModel,
  ProviderGamesFilterViewModel,
  ProviderGamesViewModel,
  ProviderGameViewModel,
  ProvidersFiltersViewModel,
  ProvidersViewModel,
  UpdateProviderLogoViewModel
} from '@/view/models';
import { convertDate } from '@atom/common';
import autoMapper, { Mapper } from '@automapper/core';
import { convertToCountryTab } from '../transformFunctions';

const { mapFrom, mapWith } = autoMapper;

export const generateProviderMappings = (mapper: Mapper) => {
  //#region Get Providers Filters Mapping
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
    )
    .forMember(
      (destination) => destination.IntegrationTypeId,
      mapFrom((source) => source.integrationTypeId)
    );
  //#endregion

  //#region Get Providers Mapping
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
  //#endregion

  const mod = {
    partnerId: null,
    providerName: '',
    realUrl: '',
    demoUrl: '',
    providers: []
  };
  //#region Ade New Provider mapping
  mapper.createMap(AddProviderViewModel, AddProviderRequestModel).forMember(
    (destination) => destination.demoUrl,
    mapFrom((source) => source.absoluteDemoUrl)
  );

  //#endregion
  //#endregion

  //#region Change Provider Status Mapping
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
  //#endregion

  //#region Get Provider Details Mapping
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
      (destination) => destination.id,
      mapFrom((source) => source.id)
    );
  //#endregion

  //#region Get Partner Provider Details Mapping
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

  //#region Get Providers List Mapping
  mapper.createMap(GetProviderResponseModel, GetProvidersViewModel).forMember(
    (destination) => destination.results,
    mapWith(ProvidersViewModel, Provider, (source) => source.results)
  );
  //#endregion

  //#region
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
  //#endregion

  //#region
  mapper.createMap(ProviderGamesResponseModel, ProviderGameViewModel).forMember(
    (destination) => destination.id,
    mapFrom((source) => source.id)
  );
  //#endregion

  //#region Get Provider Games
  mapper.createMap(GetProviderGamesResponseModel, ProviderGamesViewModel).forMember(
    (destination) => destination.results,
    mapWith(ProviderGameViewModel, ProviderGamesResponseModel, (source) => source.results)
  );
  //#endregion

  //#region Edit Provider General Information Mapping
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
  //#endregion

  //#region Update Provider Logo
  mapper
    .createMap(UpdateProviderLogoViewModel, UpdateProviderLogoRequestModel)
    .forMember(
      (destination) => destination.lastUpdatedByUserEmail,
      mapFrom((source) => 'test@gmail․com')
    )
    .forMember(
      (destination) => destination.lastUpdatedByUserId,
      mapFrom((source) => 1)
    );
  //#endregion
};
