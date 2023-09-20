import { containerInstance } from '@/di';
import { FC, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import createStore from '../redux/store';

export const GameManagementReduxProvider: FC = ({ children }) => {
  const [store, setStore] = useState<ReturnType<typeof createStore>>(null);

  useEffect(() => {
    containerInstance.configure();

    setStore(createStore());
  }, []);

  if (!store) return null;

  return <Provider store={store}>{children}</Provider>;
};
