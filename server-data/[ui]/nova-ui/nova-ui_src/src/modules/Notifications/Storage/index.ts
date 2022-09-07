import { action, makeAutoObservable, observable } from 'mobx';

type Message = {
  id: number;
  icon?: string;
  text: string;
  ttl?: number;
};

class NotificationsProto {
  MESSAGE_ID = 0;

  constructor() {
    makeAutoObservable(this);
  }

  @observable Messages: Message[] = DEVELOPMENT
    ? [
        {
          id: 1,
          icon: 'armor-indicator',
          text: 'test asdasd  ;ajsdh asd;asdjh asd asd  asda sdasd asd asda sd asd ',
          ttl: 5,
        },
        {
          id: 2,
          icon: 'nicotine-indicator',
          text: 'test asdasd  ',
          ttl: 20,
        },
      ]
    : [];

  @action addMessage(icon: string, text: string, ttl = 10) {
    this.MESSAGE_ID += 1;
    this.Messages.push({
      id: this.MESSAGE_ID,
      icon: icon,
      text: text,
      ttl: ttl,
    });
  }
}

const Notifications = new NotificationsProto();

setInterval(() => {
  Notifications.Messages.forEach((m, index, obj) => {
    // eslint-disable-next-line no-param-reassign
    m.ttl -= 1;
    if (m.ttl < 0) obj.splice(index, 1);
  });
}, 1000);

export default Notifications;
