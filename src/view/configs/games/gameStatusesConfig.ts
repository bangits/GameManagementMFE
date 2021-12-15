import { GameStatusesEnum } from '@/domain/models';

export const gameStatusesConfig: Record<
  GameStatusesEnum,
  { variant: 'active' | 'inactive' | 'blocked' | 'expired'; translationKey: string }
> = {
  [GameStatusesEnum.Inactive]: {
    variant: 'inactive',
    translationKey: 'inActive'
  },
  [GameStatusesEnum.Blocked]: {
    variant: 'blocked',
    translationKey: 'blocked'
  },
  [GameStatusesEnum.Active]: {
    variant: 'active',
    translationKey: 'active'
  },
  [GameStatusesEnum.Removed]: {
    variant: 'blocked',
    translationKey: 'removed'
  }
};
