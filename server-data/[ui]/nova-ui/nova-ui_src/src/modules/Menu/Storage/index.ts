import { makeAutoObservable, observable, computed } from 'mobx';
import { createRef } from 'react';
import * as T from '../types';

class MenuProto {
  constructor() {
    makeAutoObservable(this);
  }

  @observable name = '';

  @observable position: T.IPosition = 'tl';

  @observable focusedButton = 0;

  @observable buttons: T.IButton[] = DEVELOPMENT
    ? [
        {
          icon: 'man',
          label: 'man',
          value: 'aaa',
        },
        {
          icon: 'dna',
          label: 'dna',
          value: 'aaab',
        },
      ]
    : [];

  @observable menuShown = false;

  @computed get refs() {
    return Array.from({ length: this.buttons.length }, () => createRef<HTMLButtonElement>());
  }
}

const Storage = new MenuProto();

export default Storage;
