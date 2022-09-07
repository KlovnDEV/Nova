// core
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
// tabs
import { TabContacts } from './TabContacts';
import { TabRecent } from './TabRecent';
import { TabFavorites } from './TabFavorites';
// UI
import { Tabs, Tab, SvgIcon } from 'libs/UI';
// components
import { Page, BottomBar } from 'views/components';
// utils
import { useFocusMap } from 'utils/FocusMap';
// storage
import ContactStore from 'storage/ContactStore';
// style
import './Contacts.scss';

interface IParams {
  tabId?: string;
}
// FIXME: проставить типы
export function Contacts({ routeMatch }): JSX.Element {
  const history = useHistory();
  const { tabId } = useParams<IParams>();
  const [focusState] = useFocusMap('tab1');

  const handleTabClick = pageIndex => {
    history.push(`/contacts/${pageIndex}`);
    focusState.pop();
  };

  useEffect(() => {
    ContactStore.updateContacts();
    ContactStore.updateRecent();
  }, [tabId]);

  if (!routeMatch) return null;

  return (
    <Page
      backgroundBlur
      statusBar="dark"
      bottomBar={<BottomBar variant="dark" />}
      pageLayoutRef={focusState.ref}
      onKeyDown={e => focusState?.onKeyDown(e)}
    >
      <Tabs down center activeTab={tabId} onTabClick={handleTabClick}>
        <Tab
          key="favorites"
          focus={{ name: 'tab1', left: 'tab3', right: 'tab2', up: 'contact-search' }}
          label={
            <div className="contacts__tab-button">
              <SvgIcon height="32px" fill="#fff" src="heart" />
              <div>Favorites</div>
            </div>
          }
        >
          <TabFavorites focusState={focusState} />
        </Tab>
        <Tab
          key="contacts"
          focus={{ name: 'tab2', left: 'tab1', right: 'tab3', up: 'contact-search' }}
          label={
            <div className="contacts__tab-button">
              <SvgIcon height="32px" fill="#fff" src="contact" />
              <div>Contacts</div>
            </div>
          }
        >
          <TabContacts focusState={focusState} />
        </Tab>
        <Tab
          key="recent"
          focus={{ name: 'tab3', left: 'tab2', right: 'tab1', up: 'contact-search' }}
          label={
            <div className="contacts__tab-button">
              <SvgIcon height="32px" fill="#fff" src="recent" />
              <div>Recent</div>
            </div>
          }
        >
          <TabRecent focusState={focusState} />
        </Tab>
      </Tabs>
    </Page>
  );
}

export default Contacts;
