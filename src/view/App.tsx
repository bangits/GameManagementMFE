import createStore from '@/adapter/redux/store/store';
import { containerInstance } from '@/di';
import { AtomCommonProvider } from '@atom/common';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { AddProviderContainer, ProviderListContainer } from './components';

const App = () => {
  const [store, setStore] = useState(null);

  useEffect(() => {
    containerInstance.configure(diFiles).then(() => {
      setStore(createStore());
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
                    <ProviderListContainer />
                  </Route>

                  <Route path={`${url}/add`} exact>
                    <AddProviderContainer />
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
