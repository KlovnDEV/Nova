// eslint-disable-next-line no-unused-vars
import { observable, computed, makeAutoObservable } from 'mobx';
import LocalStore from './LocalStore';

class PhoneConfigProto {
  constructor() {
    makeAutoObservable(this);
  }

  @observable phoneNumber = '000-00-00';

  @observable phoneShown = false;

  @observable privBackgroundImage: string = LocalStore.getItem(
    'backgroundImage',
    'assets/img/background/cirilla.jpg',
  );

  @observable privZoom: string = LocalStore.getItem('zoom', '100%');

  @observable privCover: string = LocalStore.getItem('cover', 's10.png');

  @observable privRingtone: string = LocalStore.getItem('ringtone', 'assets/audio/ring.mp3');

  @observable privRingtoneVolume: number = LocalStore.getItem('ringtoneVolume', 0.3);

  @observable privLanguage: string = LocalStore.getItem('language', 'ru');

  @computed get ringtoneVolume(): number {
    return this.privRingtoneVolume;
  }

  set ringtoneVolume(val: number) {
    const cval = Math.max(0, Math.min(1, val));
    this.privRingtoneVolume = cval;
    LocalStore.setItem('ringtoneVolume', cval);
  }

  @computed get ringtone(): string {
    return this.privRingtone;
  }

  set ringtone(val: string) {
    this.privRingtone = val;
    LocalStore.setItem('ringtone', val);
  }

  @computed get backgroundImage(): string {
    return this.privBackgroundImage;
  }

  set backgroundImage(val: string) {
    this.privBackgroundImage = val;
    LocalStore.setItem('backgroundImage', val);
  }

  @computed get zoom(): string {
    return this.privZoom;
  }

  set zoom(value: string) {
    this.privZoom = value;
    LocalStore.setItem('zoom', value);
  }

  @computed get cover(): string {
    return this.privCover;
  }

  set cover(value: string) {
    this.privCover = value;
    LocalStore.setItem('cover', value);
  }

  @computed get language(): string {
    return this.privLanguage;
  }

  set language(val: string) {
    LocalStore.setItem('language', val);
  }

  registerApplication(app) {
    this.appsAvailable.push(app);
  }

  languagesAvailable: Array<[string, string]> = [
    ['ru', 'Русский'],
    ['en', 'English'],
  ];

  backgroundsAvailable: Array<[string, string]> = [
    ['back001.jpg', 'Cartoon'],
    ['back002.jpg', 'Destiny'],
    ['back003.jpg', 'Trooper'],
    ['back004.jpg', 'Beach'],
    ['back005.jpg', 'Default'],
    ['back006.jpg', 'Sky'],
    ['cirilla.jpg', 'Cirilla'],
    ['cirilla2.jpg', 'Ciri'],
  ];

  zoomAvailable: string[] = ['120%', '110%', '105%', '100%', '95%', '90%', '80%', '70%'];

  coverAvailable: Array<[string, string, Record<string, any>?]> = [
    ['gnote8.png', 'Galaxy Note 8'],
    ['iphonex.png', 'iPhone X'],
    ['s8.png', 'Samsung Galaxy S8'],
    ['s10.png', 'Samsung Galaxy S10', { height: 840, borderRadius: 30 }],
    ['note20ultra.png', 'Galaxy Note 20 Ultra', { top: 92, left: 46, height: '87%' }],
  ];

  @observable appsAvailable = [];

  ringtonesAvailable: Array<[string, string]> = [['ring.mp3', 'Default']];

  ringtoneVolumeAvailable: number[] = [0, 0.2, 0.4, 0.6, 0.8, 1];

  emojiList: string[] = [
    '😁',
    '😂',
    '😃',
    '😄',
    '😅',
    '😆',
    '😉',
    '😊',
    '😋',
    '😌',
    '😍',
    '😏',
    '😒',
    '😓',
    '😔',
    '😖',
    '😘',
    '😚',
    '😜',
    '😝',
    '😞',
    '😠',
    '😡',
    '😢',
    '😣',
    '😤',
    '😥',
    '😨',
    '😩',
    '😪',
    '😫',
    '😭',
    '😰',
    '😱',
    '😲',
    '😳',
    '😵',
    '😷',
    '😸',
    '😹',
    '😺',
    '😻',
    '😼',
    '😽',
    '😾',
    '😿',
    '🙀',
    '🙅',
    '🙆',
    '🙇',
    '🙈',
    '🙉',
    '🙊',
    '🙋',
    '🙌',
    '🙍',
    '🙎',
    '🙏',
  ];
}

const PhoneConfig = new PhoneConfigProto();

export default PhoneConfig;
