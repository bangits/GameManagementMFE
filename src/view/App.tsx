import createStore from '@/adapter/redux/store';
import { containerInstance } from '@/di';
import { AuthenticatedProvider } from '@atom/authorization';
import { AtomCommonProvider } from '@atom/common';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { ROUTES } from './constants';
import { GameListContainer, ProviderListContainer } from './pages';

const App = () => {
  const [store, setStore] = useState(null);

  useEffect(() => {
    containerInstance.configure();

    setStore(createStore());
  }, []);

  if (!store) return null;

  return (
    <AuthenticatedProvider>
      <Provider store={store}>
        <AtomCommonProvider initializeLanguage={true}>
          <Router basename={ROUTES.baseUrl}>
            <Switch>
              <Route
                path={ROUTES.providers}
                render={({ match: { url } }) => (
                  <>
                    <Route path={`${url}${ROUTES.providersList}`} exact>
                      <ProviderListContainer />
                    </Route>
                  </>
                )}
              />

              <Route
                path={ROUTES.game}
                render={({ match: { url } }) => {
                  return (
                    <>
                      <Route path={`${url}${ROUTES.gamesList}`} exact>
                        <GameListContainer />
                      </Route>
                    </>
                  );
                }}
              />

              <Redirect to={ROUTES.providers + ROUTES.providersList} />
            </Switch>
          </Router>
        </AtomCommonProvider>
      </Provider>
    </AuthenticatedProvider>
  );
};

export default App;
