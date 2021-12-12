import { Game, Provider } from '@/domain/entities';
import {
  AddProviderRequestModel,
  ChangeProviderStatusRequestModel,
  GetGameRequestModel,
  GetGameResponseModel,
  GetProviderRequestModel,
  GetProviderResponseModel,
  GetProvidersByIdResponseModel
} from '@/domain/models';
import {
  AddProviderViewModel,
  ChangeProviderStatusViewModel,
  GamesFiltersViewModel,
  GamesViewModel,
  GetGamesViewModel,
  GetProvidersViewModel,
  ProvidersFiltersViewModel,
  ProvidersViewModel
} from '@/view/models';
import type { MappingProfile } from '@automapper/core';
import autoMapper from '@automapper/core';
import { GetProvidersByIdViewModel } from './../view/models/view-models/provider/GetProvidersByIdViewModel';
import { transformToCountryModel } from './transformFunctions';

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
      mapFrom((source) => source.targetMarkets)
    )
    .forMember(
      (destination) => destination.providerCurrencies,
      mapFrom((source) => source.providerCurrencies)
    )
    .forMember(
      (destination) => destination.certifiedCountries,
      mapFrom((source) => source.certifiedCountries)
    )
    .forMember(
      (destination) => destination.restrictedCountries,
      mapFrom((source) => source.restrictedCountries)
    )
    .forMember(
      (destination) => destination.status,
      mapFrom((source) => source.status)
    )
    .forMember(
      (destination) => destination.providerLicenses,
      mapFrom((source) =>
        source.providerLicenses.map((license) => ({
          id: license.id,
          name: license.name
        }))
      )
    )
    .forMember(
      (destination) => destination.name,
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
      mapFrom((source) => source.creationDate)
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
      (destination) => destination.subTypeId,
      mapFrom((source) => source.subType)
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
      (destination) => destination.gameCertifiedCountries,
      mapFrom((source) => source.certifiedCountries)
    )
    .forMember(
      (destination) => destination.gameRestrictedCountryIds,
      mapFrom((source) => source.restrictedCountries)
    )
    .forMember(
      (destination) => destination.gameCurrencyIds,
      mapFrom((source) => source.supportedCurrencies)
    );

  mapper
    .createMap(Game, GamesViewModel)
    .forMember(
      (destination) => destination.gameId,
      mapFrom((source) => source.id)
    )
    .forMember(
      (destination) => destination.status.id,
      mapFrom((source) => source.status)
    );

  mapper.createMap(GetGameResponseModel, GetGamesViewModel).forMember(
    (destination) => destination.results,
    mapWith(GamesViewModel, Game, (source) => source.results)
  );
};
