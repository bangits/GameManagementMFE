import { GameStatusesEnum } from '@/domain/models';

export const gameStatusesConfig: Record<
  GameStatusesEnum,
  { variant: 'active' | 'inactive' | 'blocked' | 'expired'; translationKey: string }
> = {
  [GameStatusesEnum.INACTIVE]: {
    variant: 'inactive',
    translationKey: 'inActive'
  },
  [GameStatusesEnum.ACTIVE]: {
    variant: 'active',
    translationKey: 'active'
  }
};
