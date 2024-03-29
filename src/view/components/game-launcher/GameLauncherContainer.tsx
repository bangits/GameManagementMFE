import { gameApi } from '@/adapter/redux/api';
import { GameLaunchViewModel } from '@/view/models';
import { gameLaunchService } from '@/view/services';
import { AuthenticatedContext } from '@atom/authorization';
import { GameLauncher } from '@atom/design-system';
import { useCallback, useContext, useEffect, useState } from 'react';

export const GameLauncherContainer = () => {
  const { user } = useContext(AuthenticatedContext);

  const [gameLaunchConfig, setGameLaunchConfig] =
    useState<Omit<GameLaunchViewModel, 'userId' | 'currency' | 'currencyId' | 'lang' | 'projectId' | 'returnUrl'>>(
      null
    );

  const { data: gameIframeUrl, isFetching } = gameApi.useLaunchGameQuery(
    gameLaunchConfig && {
      ...gameLaunchConfig,
      userId: user.userId,
      currency: user.currencyName,
      currencyId: user.currencyId,
      lang: user.languageName,
      projectId: 1,
      returnUrl: window.location.href
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true
    }
  );

  const onClose = useCallback(() => setGameLaunchConfig(null), []);

  useEffect(() => {
    gameLaunchService.subscribe(setGameLaunchConfig);

    window.addEventListener('message', (event) => {
      // Endorphina provider
      if (event.data === 'closeGame' || event.data?.messageId === 'gameExit') onClose();
    });

    return () => {
      setGameLaunchConfig(null);
    };
  }, []);

  if (!gameLaunchConfig) return null;

  return (
    <GameLauncher
      iframeUrl={!isFetching ? gameIframeUrl : ''}
      gameBackgroundUrl={gameLaunchConfig.gameBackground}
      onCloseButtonClick={onClose}
    />
  );
};
