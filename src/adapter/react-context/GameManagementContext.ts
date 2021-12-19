import { ProviderUseCase } from '@/domain/use-case';
import { createContext } from 'react';

export interface IGameManagementContext {
  providerUseCase: ProviderUseCase;
}

export const GameManagementContext = createContext<IGameManagementContext>(null);
