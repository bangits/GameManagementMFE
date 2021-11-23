import { Provider } from '@/domain/entities';
import { GetProviderRequestModel, GetProviderResponseModel } from '@/domain/models';
import { GetProvidersViewModel, ProvidersFiltersViewModel, ProvidersViewModel } from '@/view/models';
import type { MappingProfile } from '@automapper/core';
import autoMapper from '@automapper/core';

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
      (destination) => destination.name,
      mapFrom((source) => source.providerName)
    )
    .forMember(
      (destination) => destination.providerDefaultCurrencyIds,
      mapFrom((source) => source.currency)
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

  mapper.createMap(GetProviderResponseModel, GetProvidersViewModel).forMember(
    (destination) => destination.results,
    mapWith(ProvidersViewModel, Provider, (s) => s.results)
  );
  //#endregion
};
