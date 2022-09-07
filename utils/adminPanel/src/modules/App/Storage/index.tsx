import { observable, action, makeAutoObservable } from 'mobx';
import { PopupMenuProps, TooltipProps } from 'components';
import API from 'API';
import React from 'react';
import { PlayerInfo } from '~m/GameMap/PlayerInfo';

class StorageProto {
  constructor() {
    makeAutoObservable(this);
  }

  @observable scale = 0.2;

  @observable offset = [1000, 1000];

  @observable players = observable.map<string, PlayerInfo>();

  @observable selectedPlayer: PlayerInfo = null;

  @observable teleportMode = false;

  @observable refs = {
    playerSummary: React.createRef(),
  };
}

const Storage = new StorageProto();

export default Storage;
