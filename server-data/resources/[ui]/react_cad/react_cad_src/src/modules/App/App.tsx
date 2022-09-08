// core
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
// styles // import before other rules cause they're can overwrite defaults
import './Utils/scss';
import { Photo } from 'modules';
// modules
// components
import { Drawer, Snackbar, ISnack } from 'components';
import { Box } from 'libs/UI';
import { MainStore } from 'storage/MainStore';
import style from './App.module.scss';
// storage
// utils
import { useRoutes, useEvent } from './Utils';

function App(): JSX.Element {
  const { shown } = MainStore;

  const { orgName, routes } = useRoutes();

  useEvent();

  const permissionsClickHandler = e => {
    MainStore.permissions = MainStore.permissionSets[e.target.value];
  };

  if (!shown) return null;

  return (
    <>
      {(true || DEVELOPMENT) && (
        <Box
          flex="column"
          style={{
            position: 'absolute',
            left: 10,
            bottom: 10,
            zIndex: 9999,
            backgroundColor: 'white',
          }}
        >
          {Object.entries(MainStore.permissionSets).map(([key, value]) => (
            <input type="button" key={key} value={key} onClick={permissionsClickHandler} />
          ))}
        </Box>
      )}
      <div
        className={style.frame}
        style={{
          backgroundImage: `url(${ASSETS}/img/monitor.png)`,
          opacity: MainStore.photoMode ? 0 : 1,
        }}
      >
        <main className={style.screen}>
          <Drawer orgName={orgName} />
          <Switch>
            {routes.map(route => (
              <Route key={route.path} {...route} />
            ))}
          </Switch>
          <Snackbar
            open={MainStore.snackbar.open}
            text={MainStore.snackbar.text}
            category={MainStore.snackbar.category as ISnack['category']}
          />
        </main>
      </div>
      {MainStore.photoMode && <Photo />}
    </>
  );
}

export default observer(App);
