import {
  action,
  extendObservable,
  IObservableArray,
  makeAutoObservable,
  observable,
  ObservableMap,
} from 'mobx';

export class PlayerInfo {
  @observable
  identifier: string;

  @observable
  firstname: string;

  @observable
  lastname: string;

  @observable
  health: number;

  @observable
  status: ObservableMap<string, number>;

  @observable
  points: IObservableArray<[number, number]>;

  constructor(data: Partial<PlayerInfo>) {
    makeAutoObservable(this);
    // extendObservable(this, data);
    this.identifier = data.identifier;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.health = data.health;
    this.status = observable.map<string, number>(data.status);
    this.points = observable.array<[number, number]>(data.points);
  }
}

export default PlayerInfo;
