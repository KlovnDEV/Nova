import { Vector3 } from '../../shared/Math';

export function chatMessage(...args: any[]): void {
  TriggerEvent('chat:addMessage', { args });
}

export function drawText3D(coords: Vector3, text: string, size = 1, font = 0): void {
  const camCoords = Vector3.FromArray(GetGameplayCamCoords());
  const distance = coords.distanceTo(camCoords);

  let scale = (size / distance) * 2;
  const fov = (1 / GetGameplayCamFov()) * 100;
  scale *= fov;

  SetTextScale(0.0 * scale, 0.55 * scale);
  SetTextFont(font);
  SetTextColour(255, 255, 255, 255);
  SetTextDropshadow(0, 0, 0, 0, 255);
  SetTextDropShadow();
  SetTextOutline();
  SetTextCentre(true);

  SetDrawOrigin(coords.x, coords.y, coords.z, 0);
  BeginTextCommandDisplayText('STRING');
  AddTextComponentSubstringPlayerName(text);
  EndTextCommandDisplayText(0.0, 0.0);
  ClearDrawOrigin();
}
