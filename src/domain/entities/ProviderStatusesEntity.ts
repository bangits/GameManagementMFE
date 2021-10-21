export enum ProviderStatusesEnum {
  Active = 1,
  Inactive = 2,
  Blocked = 3,
  Removed = 4
}

export interface ProviderStatus {
  id: ProviderStatusesEnum;
  name: string;
}
