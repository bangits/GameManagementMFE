import { Game, Provider } from '@/domain/entities';
import {
  AddGameRequestModel,
  AddProviderRequestModel,
  GetGameRequestModel,
  GetGameResponseModel,
  GetProviderRequestModel,
  GetProviderResponseModel
} from '@/domain/models';
import {
  AddGameViewModel,
  AddProviderViewModel,
  GamesFiltersViewModel,
  GamesViewModel,
  GetGamesViewModel,
  GetProvidersViewModel,
  ProvidersFiltersViewModel,
  ProvidersViewModel
} from '@/view/models';
import { convertDate, convertDateForRequestModel } from '@atom/common';
import type { MappingProfile } from '@automapper/core';
import autoMapper from '@automapper/core';
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
  //#endregion

  mapper.createMap(GetProviderResponseModel, GetProvidersViewModel).forMember(
    (destination) => destination.results,
    mapWith(ProvidersViewModel, Provider, (source) => source.results)
  );
  //#region Games
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
      (destination) => destination.creationDate,
      mapFrom((source) => source.creationDate[0] && convertDateForRequestModel(source.creationDate[0]))
    )
    .forMember(
      (destination) => destination.releaseDate,
      mapFrom((source) => source.releaseDate && convertDateForRequestModel(source.releaseDate))
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
      (destination) => destination.status.id,
      mapFrom((source) => source.status)
    )
    .forMember(
      (destination) => destination.creationDate,
      mapFrom((source) => `${convertDate(source.creationDate)}`)
    )
    .forMember(
      (destination) => destination.releaseDate,
      mapFrom((source) => `${convertDate(source.releaseDate)}`)
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
    );

  //#endregion

  mapper.createMap(GetGameResponseModel, GetGamesViewModel).forMember(
    (destination) => destination.results,
    mapWith(GamesViewModel, Game, (source) => source.results)
  );
};
