import { gameApi } from '@/adapter/redux/api';
import { GameLaunchViewModel } from '@/view/models';
import { gameLaunchService } from '@/view/services';
import { AuthenticatedContext } from '@atom/authorization';
import { GameLauncher } from '@atom/design-system';
import { useContext, useEffect, useState } from 'react';

export const GameLauncherContainer = () => {
  const { user } = useContext(AuthenticatedContext);

  const [gameLaunchConfig, setGameLaunchConfig] =
    useState<Omit<GameLaunchViewModel, 'userId' | 'currency' | 'currencyId'>>(null);

  const { data: gameIframeUrl } = gameApi.useLaunchGameQuery(
    gameLaunchConfig && {
      ...gameLaunchConfig,
      userId: user.userId,
      currency: user.currencyName,
      currencyId: user.currencyId
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true
    }
  );

  useEffect(() => {
    gameLaunchService.subscribe(setGameLaunchConfig);
  }, []);

  if (!gameLaunchConfig) return null;

  return (
    <GameLauncher
      iframeUrl={gameIframeUrl}
      gameBackgroundUrl={null}
      onCloseButtonClick={() => setGameLaunchConfig(null)}
    />
  );
};
