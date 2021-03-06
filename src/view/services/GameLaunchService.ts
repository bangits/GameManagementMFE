import { Subscribable } from '@atom/common';
import { GameLaunchViewModel } from '../models';

export class GameLaunchService extends Subscribable<
  Omit<GameLaunchViewModel, 'userId' | 'currency' | 'currencyId' | 'lang' | 'projectId' | 'returnUrl'>
> {}

export const gameLaunchService = new GameLaunchService();
