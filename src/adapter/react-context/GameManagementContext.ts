import { IProviderRepository } from '@/domain/boundaries';
import { createContext } from 'react';

export interface IGameManagementContext {
  providerRepository: IProviderRepository;
}

export const GameManagementContext = createContext<IGameManagementContext>(null);
