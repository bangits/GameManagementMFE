import { PrimaryKey } from '@atom/common';

export interface ProviderNames {
  id: PrimaryKey;
  name: string;
}

export class ProviderNamesEnity {
  constructor(public providerNames: ProviderNames) {}
}
