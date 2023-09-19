import { GameManagementProvider, GameManagementReduxProvider } from '@/atom-game-management';
import { AuthenticatedProvider } from '@atom/authorization';
import { AtomCommonProvider } from '@atom/common';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { ROUTES } from './constants';
import {
  AddGameContainer,
  AddProviderContainer,
  GameDetailsContainer,
  GameListContainer,
  ProviderDetailsContainer,
  ProviderListContainer
} from './pages';

const App = () => {
  return (
    <GameManagementProvider>
      <AuthenticatedProvider>
        <GameManagementReduxProvider>
          <AtomCommonProvider initializeLanguage={true}>
            <Router basename={ROUTES.baseUrl}>
              <Switch>
                <Route
                  path={ROUTES.providers}
                  render={({ match: { url } }) => {
                    return (
                      <Switch>
                        <Route path={`${url}${ROUTES.providersList}`} exact>
                          <ProviderListContainer />
                        </Route>
                        <Route path={`${url}${ROUTES.providersAdd}`} exact>
                          <AddProviderContainer />
                        </Route>
                        <Route path={`${url}${ROUTES.providerDetails}`} exact>
                          <ProviderDetailsContainer />
                        </Route>
                      </Switch>
                    );
                  }}
                />

                <Route
                  path={ROUTES.game}
                  render={({ match: { url } }) => {
                    return (
                      <Switch>
                        <Route path={`${url}${ROUTES.gamesList}`} exact>
                          <GameListContainer />
                        </Route>
                        <Route path={`${url}${ROUTES.gameAdd}`} exact>
                          <AddGameContainer />
                        </Route>
                        <Route path={`${url}${ROUTES.gameDetails}`} exact>
                          <GameDetailsContainer />
                        </Route>
                      </Switch>
                    );
                  }}
                />

                <Redirect to={ROUTES.providers + ROUTES.providersList} />
              </Switch>
            </Router>
          </AtomCommonProvider>
        </GameManagementReduxProvider>
      </AuthenticatedProvider>
    </GameManagementProvider>
  );
};

export default App;
