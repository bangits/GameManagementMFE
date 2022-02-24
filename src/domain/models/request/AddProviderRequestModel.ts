import { CountryModel, PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class AddProviderRequestModel {
  partnerId: PrimaryKey;
  providerName: string;
  realUrl: string;
  demoUrl: string;
  providers: AddProviderModel[];
}

interface AddProviderModel {
  providers: [
    {
      partnerId: PrimaryKey;
      providerName: string;
      partnerName: PrimaryKey;
      realUrl: string;
      demoUrl: string;
    }
  ];
}
