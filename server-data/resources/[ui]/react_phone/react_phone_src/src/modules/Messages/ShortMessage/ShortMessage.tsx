// core
import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
// components
import { Avatar } from 'views/components';
// styles
import './ShortMessage.scss';
// FIXME: проставить типы
export function ShortMessage(props): JSX.Element {
  const { messageRef, date, text, contact, incoming, className, ...rest } = props;

  const formattedDate = format(parseInt(date, 10), 'EEEE, d MMM · HH:mm', {
    locale: ru,
    weekStartsOn: 1,
  });

  return (
    <div
      style={{
        border: messageRef ? '3px solid #ffd026' : '0',
      }}
    >
      <div ref={messageRef} className="short-message__date">
        {formattedDate}
      </div>
      <div
        className={`short-message ${className || ''} ${
          incoming ? 'short-message_incoming' : 'short-message_outgoing'
        }`}
        {...rest}
      >
        <Avatar className="short-message__avatar" contact={contact} />
        <div className="short-message__main">
          <div className="short-message__text">{text}</div>
        </div>
      </div>
    </div>
  );
}

export default ShortMessage;
