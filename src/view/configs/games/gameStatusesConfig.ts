import { GameStatusesEnum } from '@/domain/models';

export const gameStatusesConfig: Record<
  GameStatusesEnum,
  { variant: 'active' | 'inactive' | 'blocked'; translationKey: string }
> = {
  [GameStatusesEnum.INACTIVE]: {
    variant: 'inactive',
    translationKey: 'Inactive'
  },
  [GameStatusesEnum.ACTIVE]: {
    variant: 'active',
    translationKey: 'Active'
  },
  [GameStatusesEnum.BLOCKED]: {
    variant: 'blocked',
    translationKey: 'Blocked'
  }
};
