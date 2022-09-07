import { ClientCallback } from '../Core/ClientCallback';
import { Vector3 } from '../../shared/Math/Vector3';
import { promiseTimeout, assert } from '../../shared/Utils';
import { DB } from '../DB';
import type { PlayerMoney } from './PlayerMoney';
import { SubscribeTarget } from '../../shared';
import { Log } from '../../shared';
import type { PlayerRoles } from './PlayerRoles';
import { PlayerStatus } from './PlayerStatus';

export const getPlayerIdentifiers = (handle: string): Record<string, string> => {
  const ret: string[] = [];
  for (let i = 0; i < GetNumPlayerIdentifiers(handle); i += 1) {
    ret.push(GetPlayerIdentifier(handle, i));
  }

  return Object.fromEntries(ret.map((id) => id.split(':')).filter((v) => v.length == 2));
};

export async function getUniqueIdentifier(identifiers: Record<string, string>) {
  const license = identifiers['license'] || 'aaa';

  if (license) {
    const rows = await DB.Query('users/getbylicense', { license } );
    if (rows && rows.length > 0) {
      const user = rows[0];
      if (!user.identifier) throw new Error(`Player with license ${license} has no identifier!`)
      return user.identifier;
    }    
  }

  throw new Error(`Player unique identifier not found! Available identifiers: ${Object.entries(identifiers)}`);
}

export class Player {
  readonly handle: number;
  readonly identifiers: Record<string, string>;
  identifier: string;
  name: string;
  state: StateBagInterface;
  money: PlayerMoney;
  roles: PlayerRoles;
  status: PlayerStatus;
  core: any; // специальный подобъект, используемый только Engine Core

  readonly onDrop = new SubscribeTarget<[reason: string]>();

  constructor(handle: string, understandTheConsequences?: boolean) {
    if (!understandTheConsequences) throw new Error('Attempt to instance class Player!');

    this.handle = +handle;
    assert(this.handle);

    this.identifiers = getPlayerIdentifiers(handle);
    assert(Object.keys(this.identifiers).length);
  }

  async init() {
    this.identifier = await getUniqueIdentifier(this.identifiers);
    assert(this.identifier);

    this.name = GetPlayerName(String(this.handle));
    this.state = global.Player(this.handle).state;

    assert(this.state);
  }

  /**
   * Координаты игрока в мире
   */
  get coords(): Vector3 | null {
    const c = this.state.coords;
    if (!c) return null;
    return new Vector3(c[0], c[1], c[2]);
  }

  get identity() {
    return this.state['identity'];
  }

  set identity(value) {
    emit('engine:setPlayerIdentity', value);
  }

  set coords(value: Vector3) {
    promiseTimeout(ClientCallback.Trigger(this, 'engine:teleport', value));
  }

  get health(): number {
    const ped = GetPlayerPed(`${this.handle}`);
    const health = GetEntityHealth(ped);
    if (health < 100) return 0;
    return health - 100;
  }

  set health(health: number) {
    promiseTimeout(ClientCallback.Trigger(this, 'engine:setHealth', health));
  }
  
  revive(): void {
    promiseTimeout(ClientCallback.Trigger(this, 'engine:revive'));
  }

  teleportXY(x: number, y: number, heading?: number): void {
    promiseTimeout(ClientCallback.Trigger(this, 'engine:teleportXY', x, y, heading));
  }

  /* Extension: licenses */
  get licenses(): Record<string, any> {
    return this.state['licenses'] || {};
  }

}
