import { observable, action, makeAutoObservable, reaction, toJS, runInAction } from 'mobx';
// import API from 'utils/API';
import API from 'API';
import PhoneConfig from 'storage/PhoneConfig';

class ContactStoreProto {
  constructor() {
    makeAutoObservable(this);
  }

  @observable contacts: IContact[] = [];

  @observable recent: IRecent[] = [];

  @action updateContacts() {
    API.query('phone/contacts/get', { sim_number: PhoneConfig.phoneNumber }).then(response => {
      runInAction(() => {
        this.contacts = response.data;
      });
    });
  }

  @action updateRecent() {
    API.query('phone/recent/getlast', { sim_number: PhoneConfig.phoneNumber }).then(response => {
      runInAction(() => {
        this.recent = response.data;
      });
    });
  }

  @action setFavorite(contactId: number, fav: boolean) {
    const contact = this.contacts.find(c => contactId === c.id);
    runInAction(() => {
      contact.favorite = fav;
    });
  }

  @action setPhoneNumber(phone: string) {
    PhoneConfig.phoneNumber = phone;
    this.updateContacts();
    this.updateRecent();
  }
}

const ContactStore = new ContactStoreProto();

reaction(
  () => ContactStore.contacts,
  contacts => {
    if (contacts) {
      contacts.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      });
    }
  },
);

reaction(
  () => ContactStore.recent,
  recent => {
    if (recent) {
      recent.sort((a, b) => {
        return b.last_call - a.last_call;
      });
      recent.forEach(outRecent => {
        if (outRecent.from_number != PhoneConfig.phoneNumber) {
          outRecent.phone = outRecent.from_number;
          outRecent.contact = ContactStore.contacts.find(c => c.phone === outRecent.from_number);
        } else if (outRecent.sim_number != PhoneConfig.phoneNumber) {
          outRecent.phone = outRecent.sim_number;
          outRecent.contact = ContactStore.contacts.find(c => c.phone === outRecent.sim_number);
        }
      });
    }
  },
);

export default ContactStore;
