import { makeAutoObservable, observable } from 'mobx';
import DevAnimations from '../Utils/DevMock';

type AnimationsItem = {
  hotkey: string;
  label: string;
  type?: string;
  data?: AnyObject;
  favorite?: number;
  icon?: string;
  items?: Record<string, AnimationsItem>;
};

class AnimationsProto {
  constructor() {
    makeAutoObservable(this);
  }

  @observable Cells: Record<string, AnimationsItem> = DEVELOPMENT ? DevAnimations : {};

  @observable InCar = false;
}

const Animations = new AnimationsProto();

export default Animations;
