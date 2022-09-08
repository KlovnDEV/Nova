// core
import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
// pages
import {
  Applications,
  Contacts,
  ContactInfo,
  ContactEdit,
  RecentByNumber,
  CallScreen,
  Camera,
  Home,
  Messages,
  MessagesByNumber,
  NewMessage,
  Settings,
  SettingsDisplay,
  SettingsAudio,
  SettingsSystem,
} from 'modules';
// components
import { AnimatedRoute } from 'views/components';
// utils
import API from 'API';
import { useEventHandler } from 'utils/Utils';
import { TestMarkup } from 'utils/Ringtone';
// storage
import PhoneConfig from 'storage/PhoneConfig';
// Apps
import '~s/apps';
// styles
import './App.scss';

function App() {
  const history = useHistory();

  useEventHandler(data => {
    if (data.incomingCall) {
      history.push(`/call/${data.from_phone}/in`);
    }

    if (data.setPhoneNumber) {
      PhoneConfig.phoneNumber = data.phoneNumber;
    }

    if (data.showPhone !== undefined) {
      PhoneConfig.phoneShown = data.showPhone;
    }
  });

  const findScreenStyles = () => {
    const cover = PhoneConfig.coverAvailable.find(c => c[0] === PhoneConfig.cover);

    if (cover) return { ...cover[2] };
    return {};
  };

  const routes = [
    { exact: true, path: '/', component: Home },
    { exact: true, path: '/applications', component: Applications },
    { path: '/contacts/:tabId?', component: Contacts },
    { path: '/contact/:contactId', component: ContactInfo },
    { path: '/contact/edit/:contactId?', component: ContactEdit },
    { path: '/recent/:phoneNumber', component: RecentByNumber },
    { path: '/call/:phoneNumber/:callState?', component: CallScreen },
    { exact: true, path: '/messages', component: Messages },
    { exact: true, path: '/newMessage', component: NewMessage },
    { path: '/messages/:phoneNumber/:messageId?', component: MessagesByNumber },
    { exact: true, path: '/settings', component: Settings },
    { exact: true, path: '/settings/display', component: SettingsDisplay },
    { exact: true, path: '/settings/audio', component: SettingsAudio },
    { exact: true, path: '/settings/system', component: SettingsSystem },
    { exact: true, path: '/camera', component: Camera },
  ];

  PhoneConfig.appsAvailable.forEach(app => {
    app.routes.forEach(route => {
      const r = toJS(route);
      r.component = route.component;
      routes.push(r);
    });
  });

  const onKeyUp = e => {
    if (e.key === 'Escape') {
      // FIXME: split into separate function
      API.query('phone/hide', {});
      // clear history
      const backlen = history.length - 1;
      history.go(-backlen);
      history.replace('/', {});
    }
  };

  if (!PhoneConfig.phoneShown && process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <>
      {process.env.NODE_ENV !== 'production' && TestMarkup()}
      <div style={{ zoom: PhoneConfig.zoom }} role="presentation" onKeyUp={onKeyUp}>
        <div className="phone__wrapper">
          <div
            className="phone__cover"
            style={{
              backgroundImage: `url(assets/img/cover/${PhoneConfig.cover})`,
            }}
          />
          <div className="phone__screen" style={findScreenStyles()}>
            {routes.map(route => (
              <AnimatedRoute key={route.path} {...route} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default observer(App);
