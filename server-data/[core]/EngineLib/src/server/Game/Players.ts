import { assert } from '../../shared/Utils';
import { Static } from '../../shared/Core/Static';
import { Player } from './Player';
import { PlayerMoney } from './PlayerMoney';
import { SubscribeTarget } from '../../shared';
import { PlayerRoles } from './PlayerRoles';
import { PlayerStatus } from './PlayerStatus';

export class Players extends Static {
  static PlayersByHandle = {};
  static PlayersByIdentifier = {};

  static onJoin = new SubscribeTarget<[player: Player]>();
  static onDrop = new SubscribeTarget();

  /**
   * Получить игрока по handle/source
   * @param handle source-идентификатор
   */
  static ByHandle(handle: string | number): Player {
    return Players.PlayersByHandle[handle];
  }

  /**
   * Получить игрока по уникальному идентификатору
   * @param identifier идентификатор
   */
  static ByIdentifier(identifier: string): Player {
    return Players.PlayersByIdentifier[identifier];
  }

  /**
   * Получить массив всех игроков
   */
  static All(): Player[] {
    return Object.values(Players.PlayersByHandle);
  }
}

async function onPlayerJoin(handle: string) {
  const player = new Player(handle, true);
  await player.init();
  
  player.money = new PlayerMoney(player);
  player.roles = new PlayerRoles(player);
  player.status = new PlayerStatus(player);

  Players.PlayersByHandle[player.handle] = player;
  Players.PlayersByIdentifier[player.identifier] = player;

  Players.onJoin.emit(player);
}

function onPlayerDrop(handle: string, reason: string) {
  const player = Players.ByHandle(handle);
  assert(player);

  player.onDrop.emit(reason);
  Players.onDrop.emit(player, reason);

  delete Players.PlayersByHandle[player.handle];
  delete Players.PlayersByIdentifier[player.identifier];
}

on('playerDropped', (reason: string) => {
  onPlayerDrop(String(source), reason);
});

onNet('playerJoining', () => {});

on('playerJoining', () => {
  onPlayerJoin(String(source));
});

on('engine:onPlayerMoneySet', (handle, account, amount) => {
  const player = Players.ByHandle(handle);
  player.money.onSet.emit(account, amount);
  emitNet('engine:onPlayerMoneySet', player.handle, account, amount)
})

on('engine:onPlayerMoneyAdd', (handle, account, amount, newValue) => {
  const player = Players.ByHandle(handle);
  player.money.onAdd.emit(account, amount, newValue);
  emitNet('engine:onPlayerMoneyAdd', player.handle, account, amount, newValue)
})

on('engine:onPlayerMoneySub', (handle, account, amount, newValue) => {
  const player = Players.ByHandle(handle);
  player.money.onSub.emit(account, amount, newValue);
  emitNet('engine:onPlayerMoneySub', player.handle, account, amount, newValue)
})

getPlayers().forEach(handle => {
  onPlayerJoin(handle);
})