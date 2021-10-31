import createStore from '@/adapter/redux/store/store';
import { DiContainer } from '@/di';
import { AtomCommonProvider, CountriesSelect } from '@atom/common';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { AddProviderContainer } from './addProvider';
import ProviderList from './provider/ProviderList';

console.log(CountriesSelect);

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
      <AtomCommonProvider>
        <Router basename='/game'>
          <Switch>
            <Route
              path='/providers'
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}/`} exact>
                    <div>Providers</div>
                  </Route>

                  <Route path={`${url}/add`} exact>
                    <AddProviderContainer />
                  </Route>
                  <Route path={`${url}/provider-list`} exact>
                    <ProviderList />
                  </Route>
                </>
              )}
            />

            <Redirect to='/providers' />
          </Switch>
        </Router>
      </AtomCommonProvider>
    </Provider>
  );
};

export default App;
