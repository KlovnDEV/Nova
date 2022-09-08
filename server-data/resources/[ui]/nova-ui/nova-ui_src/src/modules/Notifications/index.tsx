import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import { Icon } from 'libs/UI';
import s from './index.local.scss';
import Storage from './Storage';

const NotificationsProto = (): JSX.Element => {
  const { Messages } = Storage;

  return (
    <div className={s.NotificationsWrapper}>
      {Messages.map(message => (
        <div className={classNames(s.Message, message.ttl < 1 ? s.Hide : null)} key={message.id}>
          <Icon name={message.icon} className={s.Icon} fill="#737C80" />
          <p className={s.Text} dangerouslySetInnerHTML={{ __html: message.text }} />
        </div>
      ))}
    </div>
  );
};

export const Notifications = observer(NotificationsProto);
export default Notifications;
