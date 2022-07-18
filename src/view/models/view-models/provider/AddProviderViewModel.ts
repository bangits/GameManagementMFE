import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class AddProviderViewModel {
  partnerId: PrimaryKey;

  partnerName: string;

  providers: {
    id: PrimaryKey;
    externalId: string;
    providerName: string;
  }[];

  absoluteDemoUrl: string;

  absoluteRealUrl: string;
}
