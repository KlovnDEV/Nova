import { makeAutoObservable, observable } from 'mobx';

class IndicatorsProto {
  constructor() {
    makeAutoObservable(this);
  }

  @observable ColorsMap = [
    [255, 0, 80],
    [209, 60, 13],
    [245, 157, 107],
    [255, 255, 255],
    [255, 255, 255],
    [255, 255, 255],
    [255, 255, 255],
  ];

  @observable IndicatorsMap = [
    {
      name: 'health',
      range: [0, 0.4],
    },
    {
      name: 'thirst',
      range: [0, 0.5],
    },
    {
      name: 'alcohol',
      range: [0, 0.3],
    },
    {
      name: 'smoking',
      range: [0, 0.3],
    },
    {
      name: 'drugs',
      range: [0, 0.3],
    },
    {
      name: 'stress',
      range: [0, 0.4],
    },
    {
      name: 'armor',
      range: [0.01, 1],
    },
    {
      name: 'stamina',
      range: [0, 0.4],
    },
    {
      name: 'hunger',
      range: [0, 0.6],
    },
  ];

  @observable Buffs = DEVELOPMENT
    ? {
        nonrp: { startTime: 0 },
      }
    : {};

  @observable Voice = {
    proximity: 0,
    talking: false,
  };

  @observable Minimap = 1;

  @observable Location = DEVELOPMENT
    ? {
        time: '22:20',
        day: 'Сегодня',
        weather: 'Снег',
        direction: 'На йух',
        street: 'ВВВ ЛЕНИНГРАД',
      }
    : {
        time: '',
        day: '',
        weather: '',
        direction: '',
        street: '',
      };

  @observable isLocationVisible = true;

  @observable Car = DEVELOPMENT
    ? {
        speed: 80,
        fuel: 0.5,
        belt: -1,
      }
    : {};

  @observable IndicatorsValues: Record<string, number> = DEVELOPMENT
    ? {
        health: Math.random(),
        water: Math.random(),
        alcohol: Math.random(),
        smoking: Math.random(),
        drugs: Math.random(),
        stress: Math.random(),
        armor: Math.random(),
        stamina: Math.random(),
        food: Math.random(),
      }
    : {};
}

const IndicatorsStorage = new IndicatorsProto();

export default IndicatorsStorage;
