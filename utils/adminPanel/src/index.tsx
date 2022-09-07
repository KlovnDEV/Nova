// core
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { BrowserRouter, HashRouter, MemoryRouter, Route, Switch } from 'react-router-dom';
// modules
const App = lazy(() => import('modules/App'));
// views
const GameMap = lazy(() => import('modules/GameMap'));

const routes = [
  { exact: true, path: '/', render: (): JSX.Element => null },
  { exact: true, path: '/map', render: (): JSX.Element => <GameMap /> },
];

// svgReader(require.context(`${ASSETS}/svg/icons`, true, /\.svg$/));

const VariativeRouter = BrowserRouter;

// if (DEVELOPMENT) {
//   VariativeRouter = HashRouter;
// }

configure({
  enforceActions: 'never',
});

ReactDOM.render(
  <Provider>
    <VariativeRouter>
      <Suspense fallback={<div style={{ backgroundColor: 'transparent' }} />}>
        <App>
          <GameMap />
          {/* <Switch>
            {routes.map(r => (
              <Route key={r.path} path={r.path} exact={r.exact} render={r.render} />
            ))}
          </Switch> */}
        </App>
      </Suspense>
    </VariativeRouter>
  </Provider>,
  document.querySelector('.root'),
);
