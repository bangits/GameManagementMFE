import createStore from '@/adapter/redux/store/store';
import { DiContainer } from '@/di';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

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
                  <div>Provider add</div>
                </Route>
              </>
            )}
          />

          <Redirect to='/providers' />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
