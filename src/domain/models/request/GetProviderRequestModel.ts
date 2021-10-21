export interface GetProviderRequestModel {
  providerId: number;
  name: string;
  gameCountFrom: number;
  gameToFrom: number;
  statusId: number;
  providerDefaultCurrencyIds: [];
  providerCurrenyIds: [];
  targetMarketsIds: [];
  certifiedCountryIds: [];
  restrictedCountryIds: [];
  pageNumber: number;
  pageSize: number;
  direction: number;
  property: string;
  lastUpdatedDateFrom: string;
  lastUpdatedDateTo: string;
  registrationDateFrom: string;
  registrationDateTo: string;
}
