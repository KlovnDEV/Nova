/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import { DEV_CONTACTS, DEV_LASTMESSAGES, DEV_CONTACTMESSAGES } from 'utils/Dev';
import ContactStore from 'storage/ContactStore';

const BASEURI = 'http://react_phone/';

const throttle = (func: { (): void }) => {
  setTimeout(func, 100 + 200 * Math.random());
};

const devGetLastMessages = (url, data, then, catchHandler) => {
  throttle(() => {
    then({
      data: { messages: DEV_LASTMESSAGES },
      status: 200,
    });
  });
};

const devDeleteMessages = (url, data, then, catchHandler) => {
  throttle(() => {
    const ind = DEV_LASTMESSAGES.findIndex(e => e.phone == data.phoneNumber);
    DEV_LASTMESSAGES.splice(ind, 1);
    then({
      status: 200,
    });
  });
};

const devGetMessagesByPhone = (url, data, then, catchHandler) => {
  throttle(() => {
    then({
      data: { messages: DEV_CONTACTMESSAGES, ok: true },
      status: 200,
    });
  });
};

const devSendMessage = (url, data, then, catchHandler) => {
  DEV_CONTACTMESSAGES.push({
    id: DEV_CONTACTMESSAGES.length + 1,
    incoming: false,
    phone: '111-11-11',
    date: data.date,
    text: data.text,
  });
  throttle(() => {
    then({
      data: { messages: DEV_CONTACTMESSAGES, ok: true },
      status: 200,
    });
  });
};

const devGetContacts = (url, data, then, catchHandler) => {
  throttle(() => {
    then({
      data: { contacts: DEV_CONTACTS },
      status: 200,
    });
  });
};

const devAddContact = (url, data, then, catchHandler) => {
  ContactStore.contacts.push(data);

  throttle(() => {
    then({
      data: {
        ok: true,
        contacts: ContactStore.contacts,
      },
      status: 200,
    });
  });
};

const devDeleteContact = (url, data, then, catchHandler) => {
  const filtered = ContactStore.contacts.filter(c => c.id != data.id);

  throttle(() => {
    then({
      data: {
        ok: true,
        contacts: filtered,
      },
      status: 200,
    });
    ContactStore.contacts = filtered;
  });
};

const devStartCall = (url, data, then, catchHandler) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      then({
        data: { ok: true },
        status: 200,
      });
    } else {
      then({
        data: { busy: true },
        status: 200,
      });
    }
  }, 7000);
};

const post = (url, data, then, catchHandler = undefined) => {
  if (process.env.NODE_ENV !== 'production') {
    switch (url) {
      case 'getLastMessages':
        devGetLastMessages(url, data, then, catchHandler);
        return;
      case 'deleteMessages':
        devDeleteMessages(url, data, then, catchHandler);
        return;
      case 'getMessagesByPhone':
        devGetMessagesByPhone(url, data, then, catchHandler);
        return;
      case 'sendMessage':
        devSendMessage(url, data, then, catchHandler);
        return;
      case 'getContacts':
        devGetContacts(url, data, then, catchHandler);
        return;
      case 'startCall':
        devStartCall(url, data, then, catchHandler);
        return;
      case 'addContact':
        devAddContact(url, data, then, catchHandler);
        return;
      case 'deleteContact':
        devDeleteContact(url, data, then, catchHandler);
        return;
      default:
    }
  }

  axios
    .post(`${BASEURI}${url}`, data)
    .then(response => {
      // response.data = JSON.parse(response.data);
      then(response);
    })
    .catch(catchHandler);
};

class APIProto {
  #contacts;

  #lastMessages;
  /*
  async getLastMessages(cb) {
    post('getLastMessages', {}, response => {
      this.#lastMessages = JSON.parse(response.data).messages;
      cb(this.#lastMessages);
    });
  }

  async deleteMessages(phoneNumber, cb) {
    post('deleteMessages', { phoneNumber }, response => {
      cb(response.data);
    });
  }

  async getMessagesByPhone(phoneNumber, cb) {
    post('getMessagesByPhone', { phoneNumber }, response => {
      cb(JSON.parse(response.data));
    });
  }

  async sendMessage(phoneNumber, text, cb) {
    post('sendMessage', { phoneNumber, text, date: Date.now().toString() }, response => {
      cb(response.data);
    });
  }

  async addContact(contact, cb) {
    post('addContact', contact, response => {
      this.#contacts = response.data.contacts;
      ContactStore.updateContacts();
      cb(response.data.ok, this.#contacts);
    });
  }

  async deleteContact(contactId, cb) {
    post('deleteContact', { id: contactId }, response => {
      this.#contacts = response.data.contacts;
      ContactStore.updateContacts();
      cb(response.data.ok, this.#contacts);
    });
  }

  async setFavorite(contactId, fav, cb = undefined) {
    post('setFavorite', { contact: contactId, fav }, response => {
      ContactStore.setFavorite(contactId, fav);
      if (cb) cb(response.data.ok, response);
    });
  }

  async getContacts(cb) {
    post('getContacts', {}, response => {
      this.#contacts = response.data.contacts;
      cb(this.#contacts);
    });
  }

  async startCall(phone, cb) {
    post('startCall', { phone: phone }, response => {
      cb(response.data);
    });
  }

  async endCall(cb) {
    post('endCall', {}, response => {
      cb(response.data);
    });
  }

  async setCallAccepted(phone, cb) {
    post('setCallAccepted', { phone: phone }, response => {
      cb(response.data);
    });
  }

  async setPhoneShow(isShown, cb = undefined) {
    post('setPhoneShow', isShown, response => {
      if (cb) cb(response.data);
    });
  }
  */
}

const API = new APIProto();

export default API;
