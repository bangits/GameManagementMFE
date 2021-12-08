import { DiContainer } from '@/di';
import { DI_CONSTANTS } from '@/di/constants';
import { FC, useEffect, useState } from 'react';
import { GameManagementContext } from './GameManagementContext';

export interface GameManagementProviderProps {}

export const GameManagementProvider: FC<GameManagementProviderProps> = ({ children }) => {
  const [containerInstance, setContainerInstance] = useState<DiContainer>(null);

  useEffect(() => {
    const containerInstance = new DiContainer();

    containerInstance.configure();

    setContainerInstance(containerInstance);
  }, []);

  if (!containerInstance) return null;

  return (
    <GameManagementContext.Provider
      value={{
        providerRepository: containerInstance.diContainer.get(DI_CONSTANTS.PROVIDER.ProviderRepository),
        gameRepository: containerInstance.diContainer.get(DI_CONSTANTS.GAME.GameRepository)

      }}>
      {children}
    </GameManagementContext.Provider>
  );
};
