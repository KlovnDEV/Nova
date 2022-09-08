import { assert } from '../../shared/Utils';
import * as T from '../../shared/types';
import { Ped } from './Ped';
import type { Entity } from './Entity';
import { Model } from './Model';

export class Player {
  readonly handle: number;
  readonly name: string;
  readonly identifier: string;
  readonly state: StateBagInterface;

  constructor(handle: string) {
    this.handle = +handle;
    assert(!Number.isNaN(this.handle), 'Invalid player handle!');

    this.name = GetPlayerName(this.handle);
    assert(this.name && this.name !== '**Invalid**', 'Invalid player name!');

    this.state = global.Player(this.serverId).state;

    assert(this.state, 'Invalid player state!');

    this.identifier = this.state.identifier;
  }

  get serverId(): number {
    return GetPlayerServerId(this.handle);
  }

  get identity(): T.PlayerIdentity {
    const data = this.state.identity;
    if (!data) return { firstname: '', lastname: '', sex: T.Sex.MALE, age: 0, height: 0 };
    return data as T.PlayerIdentity;
  }

  get ped(): Ped {
    const pedHandle = GetPlayerPed(this.handle);
    if (!DoesEntityExist(pedHandle)) return null;

    return new Ped(pedHandle);
  }

  isFreeAimingAtEntity(entity: Entity): boolean {
    return IsPlayerFreeAimingAtEntity(this.handle, entity.handle);
  }

  /* Extension: roles */
  get roles(): Record<string, { grade: number }> {
    return this.state['roles'] || {};
  }

  /* Extension: licenses */
  get licenses(): Record<string, { grade: number }> {
    return this.state['licenses'] || {};
  }

  set invincible(value: boolean) {
    SetPlayerInvincible(this.handle, value);
  }

  disableFiringThisFrame(): void {
    DisablePlayerFiring(this.handle, true);
  }

  async setModel(hash: string | number) {
    const success = await new Model(hash).load(10000)
    
    if (success) {
      SetPlayerModel(this.handle, hash);
    }
  }
}
