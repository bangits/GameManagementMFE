import createStore from '@/adapter/redux/store/store';
import { DiContainer } from '@/di';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { AddProviderContainer } from './addProvider';

const App = () => {
  const [store, setStore] = useState(null);

  useEffect(() => {
    const containerInstance = new DiContainer();

    containerInstance.configure(diFiles).then(() => {
      setStore(
        createStore(
          containerInstance.diFiles.map(({ name }) => ({
            module: containerInstance.diContainer.get(name),
            name
          }))
        )
      );
    });
  }, []);

  if (!store) return null;

  return (
    <Provider store={store}>
      <AddProviderContainer />
    </Provider>
  );
};

export default App;
