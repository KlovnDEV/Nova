import { computed, observable, makeAutoObservable } from 'mobx';

class CardGasStationStoreProto {
  constructor() {
    makeAutoObservable(this);
  }

  @observable brand = '';

  @observable index = 0;

  @observable amount = 0;

  @observable capacity = 100;

  @observable tankerAmount = 0;

  @observable tankerCapacity = 100;

  @observable description = 'Заправка';

  @computed get progress() {
    switch (this.brand) {
      case 'globe':
        return 'repeating-linear-gradient(-45deg, rgb(223, 76, 100) 0 10px, rgb(236, 119, 111) 10px 20px)';
      case 'ltd':
        return 'repeating-linear-gradient(-45deg, #69d 0 10px, #8af 10px 20px)';
      case 'ron':
        return 'repeating-linear-gradient(-45deg, rgb(218, 175, 56) 0 10px, rgb(228, 191, 70) 10px 20px)';
      case 'xero':
        return 'repeating-linear-gradient(-45deg, rgb(102, 177, 221) 0 10px, rgb(136, 211, 255) 10px 20px)';
      default:
        return 'transparent';
    }
  }

  @computed get background() {
    return `${ASSETS}/img/gas-station/${this.brand}/${this.index}.png`;
  }

  @computed get title() {
    switch (this.brand) {
      case 'globe':
        return 'Globe Oil';
      case 'ltd':
        return 'LTD Limited Gasoline';
      case 'ron':
        return 'RON';
      case 'xero':
        return 'Xero Gas';
      default:
        return 'Gas Station';
    }
  }
}

const CardGasStationStore = new CardGasStationStoreProto();

export default CardGasStationStore;
