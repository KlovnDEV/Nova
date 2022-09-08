import { Player } from '../Game/Player';

export function showNotification(player: Player, text: string) {
  emitNet('ui:showNotification', player.handle, {text})
}
