import { SortModel } from '@atom/common';
export interface GetProviderRequestModel extends SortModel {
  providerId: number;
  name: string;
  gameCountFrom: number;
  gameCountTo: number;
  statusId: number;
  providerDefaultCurrencyIds: number[];
  providerCurrenyIds: number[];
  targetMarketsIds: number[];
  certifiedCountryIds: number[];
  restrictedCountryIds: number[];
  lastUpdatedDateFrom: string;
  lastUpdatedDateTo: string;
  registrationDateFrom: string;
  registrationDateTo: string;
}
