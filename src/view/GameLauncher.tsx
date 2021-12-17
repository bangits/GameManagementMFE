import createStore from '@/adapter/redux/store';
import { containerInstance } from '@/di';
import { AuthenticatedProvider } from '@atom/authorization';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { GameLauncherContainer } from '.';

const GameLauncher = () => {
  const [store, setStore] = useState(null);

  useEffect(() => {
    containerInstance.configure();

    setStore(createStore());
  }, []);

  if (!store) return null;

  return (
    <AuthenticatedProvider>
      <Provider store={store}>
        <GameLauncherContainer />
      </Provider>
    </AuthenticatedProvider>
  );
};

export default GameLauncher;
