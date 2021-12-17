import { gameApi } from '@/adapter/redux/api';
import { GameLaunchViewModel } from '@/view/models';
import { gameLaunchService } from '@/view/services';
import { GameLauncher } from '@atom/design-system';
import { useEffect, useState } from 'react';

export const GameLauncherContainer = () => {
  const [gameLaunchConfig, setGameLaunchConfig] = useState<Omit<GameLaunchViewModel, 'userId'>>(null);

  const { data: gameIframeUrl } = gameApi.useLaunchGameQuery({ ...gameLaunchConfig, userId: 1 });

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
