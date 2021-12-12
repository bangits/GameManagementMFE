import { ProviderStatusesEnum } from '@/domain/models';

export const providerStatusesConfig: Record<
  ProviderStatusesEnum,
  { variant: 'active' | 'inactive' | 'blocked'; translationKey: string }
> = {
  [ProviderStatusesEnum.Inactive]: {
    variant: 'inactive',
    translationKey: 'inActive'
  },
  [ProviderStatusesEnum.Blocked]: {
    variant: 'blocked',
    translationKey: 'blocked'
  },
  [ProviderStatusesEnum.Active]: {
    variant: 'active',
    translationKey: 'active'
  },
  [ProviderStatusesEnum.Removed]: {
    variant: 'blocked',
    translationKey: 'removed'
  }
};
