import { DiContainer } from '@/di';
import { DI_CONSTANTS } from '@/di/constants';
import { FC, useMemo } from 'react';
import { GameManagementContext } from './GameManagementContext';

export interface GameManagementProviderProps {}

export const GameManagementProvider: FC<GameManagementProviderProps> = ({ children }) => {
  const containerInstance = useMemo(() => new DiContainer(), []);

  if (!containerInstance) return null;

  return (
    <GameManagementContext.Provider
      value={{
        providerUseCase: containerInstance.diContainer.get(DI_CONSTANTS.PROVIDER.ProviderUseCase)
      }}>
      {children}
    </GameManagementContext.Provider>
  );
};
