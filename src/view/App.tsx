import createStore from '@/adapter/redux/store';
import { GameManagementProvider } from '@/atom-game-management';
import { containerInstance } from '@/di';
import { AtomCommonProvider } from '@atom/common';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { ROUTES } from './constants';
import { AddProviderContainer, ProviderListContainer } from './pages';

const App = () => {
  const [store, setStore] = useState(null);

  useEffect(() => {
    containerInstance.configure();

    setStore(createStore());
  }, []);

  if (!store) return null;

  return (
    <Provider store={store}>
      <AtomCommonProvider initializeLanguage>
        <GameManagementProvider>
          <Router basename={ROUTES.baseUrl}>
            <Switch>
              <Route
                path={ROUTES.providers}
                render={({ match: { url } }) => (
                  <>
                    <Route path={`${url}${ROUTES.providersList}`} exact>
                      <ProviderListContainer />
                    </Route>

                    <Route path={`${url}${ROUTES.providersAdd}`} exact>
                      <AddProviderContainer />
                    </Route>
                  </>
                )}
              />

              <Redirect to={ROUTES.providers + ROUTES.providersList} />
            </Switch>
          </Router>
        </GameManagementProvider>
      </AtomCommonProvider>
    </Provider>
  );
};

export default App;
