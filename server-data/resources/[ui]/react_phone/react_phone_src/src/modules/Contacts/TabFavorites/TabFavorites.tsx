// core
import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
// ui
import { Control, TextField } from 'libs/UI';
// components
import { Avatar } from 'views/components';
// storage
import ContactStore from 'storage/ContactStore';
// styles
import './TabFavorites.scss';
// FIXME: проставить типы
function Favorites({ focusState }): JSX.Element {
  const history = useHistory();
  const [filterText, setFilterText] = useState('');

  const contacts = ContactStore.contacts.filter(contact => contact.favorite);

  let filteredContacts = contacts;

  if (filterText !== '') {
    filteredContacts = contacts.filter(elem =>
      elem.name.toLowerCase().includes(filterText.toLowerCase()),
    );
  }

  return (
    <div className="tab-favorites__page page__scrollbar">
      <TextField
        fullWidth
        variant="outlined"
        label="Поиск контактов"
        tabIndex={0}
        focus={{ name: 'contact-search', down: filteredContacts.length > 0 ? 'fav0' : 'tab1' }}
        onChange={e => {
          setFilterText(e.target.value);
        }}
        value={filterText}
      />
      <div className="tab-favorites__grid">
        {filteredContacts.map((contact, index) => {
          return (
            <Control
              role="presentation"
              key={contact.id}
              className="tab-favorites__contact"
              tabIndex={index}
              focus={{
                name: `fav${index}`,
                left: `fav${index - 1}`,
                right: `fav${index + 1}`,
                down: 'tab1',
                up: 'contact-search',
              }}
              onClick={() => {
                history.push(`/contact/${contact.id}`);
              }}
            >
              <Avatar className="tab-favorites__avatar" contact={contact} />
              <div className="tab-favorites__name">{contact.name}</div>
            </Control>
          );
        })}
      </div>
    </div>
  );
}

export const TabFavorites = observer(Favorites);
export default observer(Favorites);
