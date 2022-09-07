// core
import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { startOfDay, subDays } from 'date-fns';
// ui
import { ContactsDial } from '../ContactsDial';
// components
import { Box, Accordion, TextField, Button, SvgIcon, FloatingButton } from 'libs/UI';
// utils
import PhoneConfig from '~s/storage/PhoneConfig';
import { RecentItem } from '~v/components/RecentItem';
// storage
import ContactStore from 'storage/ContactStore';
// styles
import './TabRecent.scss';
// FIXME: проставить типы
function Recent({ focusState }): JSX.Element {
  const history = useHistory();
  const [filterText, setFilterText] = useState('');
  const [isDialExpanded, setDialExpanded] = useState(false);

  let lastDate = '';

  const handleFilterChange = e => {
    setFilterText(e.target.value);
  };

  let filteredRecent = ContactStore.recent;

  if (filterText !== '') {
    filteredRecent = filteredRecent.filter(elem => {
      if (elem.contact) {
        if (elem.contact.name.toLowerCase().includes(filterText.toLowerCase())) return true;
        if (elem.from_number.includes(filterText)) return true;
        if (elem.sim_number.includes(filterText)) return true;
      }
      return false;
    });
  }

  return (
    <>
      <ContactsDial
        isOpen={isDialExpanded}
        onClose={() => {
          setDialExpanded(false);
        }}
      />

      <FloatingButton
        onClick={() => {
          setDialExpanded(e => !e);
        }}
        style={{
          position: 'absolute',
          right: 20,
          bottom: 20,
          transition: 'transform 250ms ease-in-out',
        }}
        tabIndex={0}
        focus={{ name: 'button-dial', down: 'tab3', left: 'recent0', enter: 'dial1' }}
      >
        <SvgIcon width={26} height={26} fill="#fff" src="dial" />
      </FloatingButton>

      <div className="tab-recent__page page__scrollbar">
        <TextField
          fullWidth
          variant="outlined"
          label="Поиск контактов"
          onChange={handleFilterChange}
          value={filterText}
          focus={{
            name: 'contact-search',
            down: filteredRecent.length > 0 ? 'recent0' : 'button-dial',
          }}
        />
        <div className="tab-recent__list">
          {filteredRecent.map((recent, index) => {
            const callDate = new Date(recent.last_call);

            let daysAgoText = 'раньше';

            if (callDate > startOfDay(new Date())) {
              daysAgoText = 'сегодня';
            } else if (callDate > startOfDay(subDays(new Date(), 1))) {
              daysAgoText = 'вчера';
            }

            if (daysAgoText === lastDate) {
              daysAgoText = '';
            } else {
              lastDate = daysAgoText;
            }

            return (
              <div key={recent.id}>
                {daysAgoText && (
                  <p
                    style={{
                      textTransform: 'uppercase',
                      fontSize: '0.6rem',
                      color: '#777',
                      fontWeight: 500,
                      padding: '15px 0',
                    }}
                  >
                    {daysAgoText}
                  </p>
                )}
                <Accordion
                  content={
                    <Box flex="around top">
                      <Button
                        width={80}
                        description="История звонков"
                        tabIndex={1}
                        className="tab-recent__button"
                        focus={{
                          name: `recent${index}-button1`,
                          right: `recent${index}-button2`,
                          up: `recent${index}`,
                          down: `recent${index + 1}`,
                        }}
                        onClick={() => {
                          history.push(`/recent/${recent.phone}`);
                        }}
                      >
                        <SvgIcon width="32" height="32" fill="#239cff" src="HistoryOutlined" />
                      </Button>
                      <Button
                        width={80}
                        description="Отправить сообщение"
                        tabIndex={2}
                        className="tab-recent__button"
                        onClick={() => {
                          history.push(`/messages/${recent.phone}`);
                        }}
                        focus={{
                          name: `recent${index}-button2`,
                          left: `recent${index}-button1`,
                          right: `recent${index}-button3`,
                          up: `recent${index}`,
                          down: `recent${index + 1}`,
                        }}
                      >
                        <SvgIcon width="32" height="32" fill="#239cff" src="MessageOutlined" />
                      </Button>
                      <Button
                        width={80}
                        description="Отправить координаты"
                        tabIndex={3}
                        className="tab-recent__button"
                        focus={{
                          name: `recent${index}-button3`,
                          left: `recent${index}-button2`,
                          up: `recent${index}`,
                          down: `recent${index + 1}`,
                        }}
                      >
                        <SvgIcon width="32" height="32" fill="#239cff" src="PersonPinCircle" />
                      </Button>
                    </Box>
                  }
                >
                  <RecentItem
                    key={recent.contact?.id}
                    phone={recent.phone}
                    onCallClick={() => {
                      if (recent.phone) history.push(`/call/${recent.phone}/out`);
                    }}
                    recent={recent}
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
                </Accordion>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export const TabRecent = observer(Recent);
export default observer(Recent);
