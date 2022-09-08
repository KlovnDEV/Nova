// core
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
// ui
import { AppBar } from 'libs/UI';
// components
import { Page, BottomBar, RecentItem } from 'views/components';
// utils
import API from 'API';
// storage
import PhoneConfig from '~s/storage/PhoneConfig';
// styles
import './RecentByNumber.scss';

export function RecentByNumber(): JSX.Element {
  const history = useHistory();
  const { phoneNumber } = useParams<any>();
  const [recents, setRecents] = useState<IRecent[]>([]);

  useEffect(() => {
    API.query('phone/recent/get', {
      sim_number: PhoneConfig.phoneNumber,
      from_number: phoneNumber,
    }).then(response => {
      setRecents(response.data);
    });
  }, []);

  return (
    <Page
      className="recents__page page__scrollbar"
      backgroundBlur
      appBar={
        <AppBar
          right={<></>}
          onBack={() => {
            history.goBack();
          }}
        />
      }
      statusBar="dark"
      bottomBar={<BottomBar variant="light" />}
    >
      <div>
        {recents.map((recent, index) => (
          <RecentItem
            key={recent.contact?.id}
            recent={recent}
            onCallClick={() => {
              if (recent.phone) history.push(`/call/${recent.phone}/out`);
            }}
            tabIndex={index}
            focus={{
              name: `recent${index}`,
              down: `recent${index + 1}`,
              left: 'tab3',
              right: 'button-dial',
              enter: `recent${index}-button1`,
              up: (() => {
                if (index === 0) return 'contact-search';
                return `recent${index - 1}`;
              })(),
            }}
          />
        ))}
      </div>
    </Page>
  );
}

export default observer(RecentByNumber);
