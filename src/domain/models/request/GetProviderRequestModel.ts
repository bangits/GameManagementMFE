import { SortModel } from '../models/SortModel';

export interface GetProviderRequestModel extends SortModel {
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
  direction: number;
  property: string;
  lastUpdatedDateFrom: string;
  lastUpdatedDateTo: string;
  registrationDateFrom: string;
  registrationDateTo: string;
}
