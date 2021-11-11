import { DiContainer } from '@/di';
import { FC, useEffect, useState } from 'react';
import { GameManagementContext } from './GameManagementContext';

export interface GameManagementProviderProps {}

export const GameManagementProvider: FC<GameManagementProviderProps> = ({ children }) => {
  const [containerInstance, setContainerInstance] = useState<DiContainer>(null);

  useEffect(() => {
    const containerInstance = new DiContainer();

    containerInstance.configure(diFiles).then(async () => {
      setContainerInstance(containerInstance);
    });
  }, []);

  if (!containerInstance) return null;

  return (
    <GameManagementContext.Provider
      value={{
        providerUseCase: containerInstance.diContainer.get('ProviderUseCase')
      }}>
      {children}
    </GameManagementContext.Provider>
  );
};
