import React from 'react';
import { ru } from 'date-fns/locale';
import { useHistory } from 'react-router-dom';
import { formatDistanceStrict, formatRelative, startOfDay } from 'date-fns';
import { ContactItem, IProps as ContactProps } from '../ContactItem';

interface IProps extends Partial<ContactProps> {
  recent?: IRecent;
  phone?: string;
}

const stat = {
  0: '🡥',
  1: '🡧',
  2: '×',
  3: '☇',
};

export function RecentItem(props: IProps): JSX.Element {
  const { recent, phone, ...rest } = props;
  const history = useHistory();

  const callDate = new Date(recent.last_call);

  let formattedDate = formatDistanceStrict(callDate, new Date(), {
    locale: ru,
    addSuffix: true,
  });

  if (callDate <= startOfDay(new Date())) {
    formattedDate = formatRelative(callDate, new Date(), { locale: ru, weekStartsOn: 1 });
  }

  return (
    <ContactItem
      {...rest}
      description={
        <>
          <span style={{ color: recent.declined ? '#c00' : '#090', fontSize: 16 }}>
            {stat[(recent.incoming ? 1 : 0) + (recent.declined ? 2 : 0)]}
          </span>
          <span>&nbsp;{formattedDate}</span>
        </>
      }
      contact={recent.contact}
      name={phone}
    />
  );
}

export default RecentItem;
