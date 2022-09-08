// core
import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { useHistory } from 'react-router-dom';
// ui
import { TextField, FloatingButton, SvgIcon } from 'libs/UI';
// components
import { ContactsDial } from 'modules/Contacts/ContactsDial';
import { ContactItem } from 'views/components/ContactItem';
// storage
import ContactStore from 'storage/ContactStore';
// styles
import './TabContacts.scss';
// FIXME: проставить типы
function Contacts({ focusState }): JSX.Element {
  const history = useHistory();

  const [filterText, setFilterText] = useState('');
  const [isDialExpanded, setDialExpanded] = useState(false);

  let letter = '';

  const handleNewContactClick = () => {
    history.push('/contact/edit');
  };

  const handleFilterChange = e => {
    setFilterText(e.target.value);
  };

  const { contacts } = ContactStore;

  let filteredContacts = contacts;

  if (filterText !== '') {
    filteredContacts = contacts.filter(elem =>
      elem.name.toLowerCase().includes(filterText.toLowerCase()),
    );
  }

  const handleContactClick = contactId => {
    history.push(`/contact/${contactId}`);
  };

  return (
    <>
      <ContactsDial
        isOpen={isDialExpanded}
        onClose={() => {
          setDialExpanded(false);
          focusState.pop();
        }}
      />
      <FloatingButton
        onClick={handleNewContactClick}
        style={{
          position: 'absolute',
          right: 25,
          bottom: 88,
          width: 45,
          height: 45,
          transition: 'transform 250ms ease-in-out',
        }}
        color="#d32f2f"
        tabIndex={-1}
        focus={{
          name: 'button-add',
          down: 'button-dial',
          left: filteredContacts.length > 0 ? 'contact0' : 'contact-search',
        }}
      >
        <SvgIcon width={26} height={26} fill="#fff" src="Add" />
      </FloatingButton>

      <FloatingButton
        onClick={() => {
          setDialExpanded(true);
          focusState.push();
          focusState.setFocus('dial1');
        }}
        style={{
          position: 'absolute',
          right: 20,
          bottom: 20,
          transition: 'transform 250ms ease-in-out',
        }}
        tabIndex={-1}
        focus={{
          name: 'button-dial',
          down: 'tab2',
          left: filteredContacts.length > 0 ? 'contact0' : 'contact-search',
          up: 'button-add',
        }}
      >
        <SvgIcon width={26} height={26} fill="#fff" src="dial" />
      </FloatingButton>

      <div className="tab-contacts__page page__scrollbar">
        <TextField
          fullWidth
          variant="outlined"
          label="Поиск контактов"
          focus={{
            name: 'contact-search',
            down: filteredContacts.length > 0 ? 'contact0' : 'button-add',
          }}
          onChange={handleFilterChange}
          value={filterText}
        />

        <div className="tab-contacts__list">
          {filteredContacts.map((c, index) => {
            let newLetter = ' ';
            if (c.name.charAt(0) !== letter) {
              letter = c.name.charAt(0);
              newLetter = letter;
            }
            return (
              <ContactItem
                key={c.id}
                name={c.name}
                letter={newLetter}
                tabIndex={index}
                focus={{
                  name: `contact${index}`,
                  right: 'button-add',
                  left: 'tab2',
                  down: (() => {
                    if (index === filteredContacts.length - 1) return 'tab2';
                    return `contact${index + 1}`;
                  })(),
                  up: (() => {
                    if (index === 0) return 'contact-search';
                    return `contact${index - 1}`;
                  })(),
                }}
                onClick={() => handleContactClick(c.id)}
                contact={c}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
export const TabContacts = observer(Contacts);
export default observer(Contacts);
