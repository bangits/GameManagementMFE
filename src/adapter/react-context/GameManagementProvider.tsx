import { DiContainer } from '@/di';
import { DI_CONSTANTS } from '@/di/constants';
import { FC, useMemo } from 'react';
import { GameManagementContext } from './GameManagementContext';

export interface GameManagementProviderProps {}

export const GameManagementProvider: FC<GameManagementProviderProps> = ({ children }) => {
  const containerInstance = useMemo(() => {
    const diContainer = new DiContainer();

    diContainer.configure();

    return diContainer;
  }, []);

  if (!containerInstance) return null;

  return (
    <GameManagementContext.Provider
      value={{
        providerUseCase: containerInstance.diContainer.get(DI_CONSTANTS.PROVIDER.ProviderUseCase),
        gameUseCase: containerInstance.diContainer.get(DI_CONSTANTS.GAME.GameUseCase)
      }}>
      {children}
    </GameManagementContext.Provider>
  );
};
