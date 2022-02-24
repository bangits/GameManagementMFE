import { GameUseCase, ProviderUseCase } from '@/domain/use-case';
import { createContext } from 'react';

export interface IGameManagementContext {
  providerUseCase: ProviderUseCase;
  gameUseCase: GameUseCase;

}

export const GameManagementContext = createContext<IGameManagementContext>(null);
