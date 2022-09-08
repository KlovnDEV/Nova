// core
import React from 'react';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import { useHistory } from 'react-router-dom';
import { useLocalObservable } from 'mobx-react';
// components
import { Page, BottomBar, AppButton } from 'views/components';
// utils
import API from 'API';
import { useFocusMap, generateGridFocusMap } from 'utils/FocusMap';
// style
import './Home.scss';
// FIXME: проставить типы
export function Home(): JSX.Element {
  const store = useLocalObservable(() => ({
    items: [
      { i: '1', x: 1, y: 3, w: 1, h: 1, icon: 'aimp.png', label: 'AIMP' },
      { i: '2', x: 2, y: 3, w: 1, h: 1, icon: 'cheats_for_gta.png', label: 'Yep' },
      { i: '3', x: 1, y: 4, w: 1, h: 1, icon: 'flashlight.png', label: 'Flashlight' },
      { i: '4', x: 2, y: 4, w: 1, h: 1, icon: 'pixomatic.png', label: 'Pixomatic' },
    ],
  }));

  generateGridFocusMap(store.items);

  const lowerY = store.items.map(item => item.y).reduce((acc, y) => Math.max(acc, y));

  store.items
    .filter(item => item.y === lowerY)
    .forEach(item => {
      const i: any = item;
      i.focusDown = 'bottom3';
    });

  const lowerGridItem = store.items.find(item => item.y === lowerY);

  const history = useHistory();
  const [focusState] = useFocusMap('bottom3');

  const onGridDragStop = newItems => {
    newItems.forEach(item => {
      const storeItem = store.items.find(si => si.i == item.i);

      if (storeItem) {
        storeItem.x = item.x;
        storeItem.y = item.y;
      }
    });

    generateGridFocusMap(newItems);
  };

  return (
    <Page
      className="home__screen"
      pageLayoutRef={focusState.ref}
      backgroundBlur={false}
      onKeyDown={e => focusState?.onKeyDown(e)}
      statusBar
      bottomBar={
        <BottomBar onKeyDown={e => focusState?.onKeyDown(e)}>
          <div className="bottom-bar__buttons">
            <AppButton
              tabIndex={1}
              focus={{ name: 'bottom1', right: 'bottom2', up: lowerGridItem.i }}
              icon="phone_alt3.png"
              label=""
              onClick={() => history.push('/contacts')}
            />
            <AppButton
              tabIndex={2}
              focus={{ name: 'bottom2', left: 'bottom1', right: 'bottom3', up: lowerGridItem.i }}
              icon="message_alt3.png"
              label=""
              onClick={() => history.push('/messages')}
            />
            <AppButton
              tabIndex={3}
              focus={{ name: 'bottom3', left: 'bottom2', right: 'bottom4', up: lowerGridItem.i }}
              icon="app_drawer_2.png"
              label=""
              onClick={() => history.push('/applications')}
            />
            <AppButton
              tabIndex={4}
              focus={{ name: 'bottom4', left: 'bottom3', right: 'bottom5', up: lowerGridItem.i }}
              icon="settings.png"
              label=""
              onClick={() => history.push('/settings')}
            />
            <AppButton
              tabIndex={5}
              focus={{ name: 'bottom5', left: 'bottom4', up: lowerGridItem.i }}
              icon="camera_alt3.png"
              label=""
              onClick={() => API.query('phone/photo/start', {}) /* history.push('/camera') */}
            />
          </div>
        </BottomBar>
      }
    >
      <ResponsiveGridLayout
        className="home__screen_grid"
        autoSize={false}
        layouts={{ lg: store.items, sm: store.items }}
        breakpoints={{ lg: 400, sm: 340 }}
        cols={{ lg: 5, sm: 4 }}
        width={400}
        rowHeight={90}
        margin={[0, 0]}
        containerPadding={[0, 0]}
        onDragStop={onGridDragStop}
        compactType={null}
        isBounded
        preventCollision
      >
        {store.items.map((elem: any) => {
          return (
            <AppButton
              tabIndex={parseInt(elem.i, 10) + 10}
              focus={{
                name: elem.i,
                right: elem.focusRight,
                left: elem.focusLeft,
                up: elem.focusUp,
                down: elem.focusDown,
              }}
              key={elem.i}
              icon={elem.icon}
              label={elem.label}
              onClick={() => {}}
            />
          );
        })}
      </ResponsiveGridLayout>
    </Page>
  );
}

export default Home;
