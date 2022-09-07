// core
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { HashRouter, MemoryRouter, Route, Switch } from 'react-router-dom';
import { imgReader } from 'utils/fileReaders';
// modules
const App = lazy(() => import('modules/App'));
// views
const UIKit = lazy(() => import('views/UIKit'));
const GameMenu = lazy(() => import('views/GameMenu'));
const Bank = lazy(() => import('views/Bank'));
const Craft = lazy(() => import('views/Craft'));
const Inventory = lazy(() => import('views/Inventory'));
const Skinchanger = lazy(() => import('views/Skinchanger'));
const GasStations = lazy(() => import('views/GasStations'));
const ClothesShop = lazy(() => import('views/ClothesShop'));
const Animations = lazy(() => import('views/Animations'));
const PlayerInfo = lazy(() => import('modules/PlayerInfo'));
const DeathScreen = lazy(() => import('views/DeathScreen'));
const Shop = lazy(() => import('views/Shop'));
const CarShop = lazy(() => import('views/MechanicCarShop'));
const Health = lazy(() => import('views/HealthCheck'));

const routes = [
  { exact: true, path: '/', render: (): JSX.Element => null },
  { exact: true, path: '/UIkit', render: (): JSX.Element => <UIKit /> },
  { exact: true, path: '/menu', render: (): JSX.Element => <GameMenu /> },
  { exact: true, path: '/bank', render: (): JSX.Element => <Bank /> },
  { exact: true, path: '/craft', render: (): JSX.Element => <Craft /> },
  { exact: true, path: '/inventory', render: (): JSX.Element => <Inventory /> },
  { exact: true, path: '/skin', render: (): JSX.Element => <Skinchanger /> },
  { exact: true, path: '/gasstations', render: (): JSX.Element => <GasStations /> },
  { exact: true, path: '/clothesshop', render: (): JSX.Element => <ClothesShop /> },
  { exact: true, path: '/animations', render: (): JSX.Element => <Animations /> },
  { exact: true, path: '/info', render: (): JSX.Element => <PlayerInfo /> },
  { exact: true, path: '/death', render: (): JSX.Element => <DeathScreen /> },
  { exact: false, path: '/shop', render: (): JSX.Element => <Shop /> },
  { exact: false, path: '/carshop', render: (): JSX.Element => <CarShop /> },
  { exact: false, path: '/health', render: (): JSX.Element => <Health /> },
];

// svgReader(require.context(`${ASSETS}/svg/icons`, true, /\.svg$/));

imgReader(require.context(`${ASSETS}/img/clothes/`, true, /^assets.*\.jpg$/));

let VariativeRouter = MemoryRouter;

if (DEVELOPMENT) {
  VariativeRouter = HashRouter;
}

configure({
  enforceActions: 'never',
});

ReactDOM.render(
  <Provider>
    <VariativeRouter>
      <Suspense fallback={<div style={{ backgroundColor: 'transparent' }} />}>
        <App>
          <Switch>
            {routes.map(r => (
              <Route key={r.path} path={r.path} exact={r.exact} render={r.render} />
            ))}
          </Switch>
        </App>
      </Suspense>
    </VariativeRouter>
  </Provider>,
  document.querySelector('.root'),
);
