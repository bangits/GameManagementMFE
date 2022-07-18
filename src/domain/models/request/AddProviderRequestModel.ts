import { CountryModel, PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class AddProviderRequestModel {
  providers: {
    partnerId: PrimaryKey;
    providerName: string;
    partnerName: string;
    realUrl: string;
    demoUrl: string;
    externalId: string;
  }[];
}
