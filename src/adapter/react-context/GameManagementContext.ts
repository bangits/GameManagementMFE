import { IGameRepository, IProviderRepository } from '@/domain/boundaries';
import { createContext } from 'react';

export interface IGameManagementContext {
  providerRepository: IProviderRepository;
  gameRepository: IGameRepository;

}

export const GameManagementContext = createContext<IGameManagementContext>(null);
