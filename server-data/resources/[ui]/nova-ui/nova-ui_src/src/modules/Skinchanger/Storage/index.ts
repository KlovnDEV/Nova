/* eslint-disable camelcase */
import { makeAutoObservable, observable, action, computed, reaction } from 'mobx';
import _ from 'underscore';
import { ChangeEvent } from 'react';
import API from 'API';

class SkinchangerStoreProto {
  @observable skinMap = new Map();

  updateSkin = _.throttle(
    (persistent: _): void => {
      API.query('skin/update', {
        skin: Object.fromEntries(this.skinMap.entries()),
        persistent,
      }).catch(function () {});
    },
    100,
    { leading: false },
  );

  constructor() {
    makeAutoObservable(this);
    reaction(
      (): string => JSON.stringify(Object.fromEntries(this.skinMap.entries())),
      (): void => {
        if (this.skinMap.get('torso_1') !== undefined) this.updateSkin();
      },
      { delay: 100 },
    );
  }

  @observable activeTab = 'register';

  @observable name = '';

  @observable lastname = '';

  @observable age: number | string = '';

  @observable hair_color_1 = [];

  @observable hair_color_2 = [];

  @observable lipstick = [];

  @observable makeup_3 = [];

  @observable makeup_4 = [];

  @observable blush_3 = [];

  @observable beard_3 = [];

  @observable shopType: 'skin' | 'barber' | 'makeup' = 'barber';

  @observable price = 10;

  @action setActiveTab = (name: string): void => {
    this.activeTab = name;
    API.query('skin/page/set', { page: name });
  };

  @action setSkin(skin: { [s: string]: unknown } | ArrayLike<unknown>): void {
    this.skinMap.clear();
    Object.entries(skin).forEach(([key, val]) => {
      this.skinMap.set(key, val);
    });
  }

  @action validateAge = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    let value = parseInt(e.target.value, 10);
    if (value > 99) value = 99;
    if (value < 18 || !value) value = 18;
    this[e.target.name] = value;
  };

  @action validateInitials = (e: ChangeEvent<HTMLInputElement>): void => {
    let { value } = e.target;
    value = value.replace(/[^a-z ]/i, '');
    this[e.target.name] = value;
  };

  @action setSkinMap = (target: number | string, value: number | string): void => {
    this.skinMap.set(target, value);
  };

  @action deleteSkinMapItem = (target: number | string): void => {
    this.skinMap.set(target, -1);
  };

  @action apply = () =>
    API.query('skin/apply', {
      skin: Object.fromEntries(this.skinMap.entries()),
      identity: {
        firstname: this.name,
        lastname: this.lastname,
        sex: this.skinMap.get('sex'),
        age: this.age,
      },
    }).catch(() => {});

  @action buy = () =>
    API.query('skin/buy', {
      skin: Object.fromEntries(this.skinMap.entries()),
    }).catch(() => {});

  @computed getSkinMap = (target: number | string): number | string => {
    return this.skinMap.get(target);
  };
}

const SkinchangerStore = new SkinchangerStoreProto();

export default SkinchangerStore;
