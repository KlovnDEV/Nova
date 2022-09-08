import { Static } from '../../shared';

export class NUI extends Static {
 
  static send(message: any): boolean {
    return !!SendNuiMessage(JSON.stringify(message));
  }

  static on(message: string, callback: { (data: any, cb: Function): void }): void {
    RegisterNuiCallbackType(message);
    on(`__cfx_nui:${message}`, callback);
  }

  static setFocus(hasFocus: boolean, hasCursor: boolean): void {
    SetNuiFocus(hasFocus, hasCursor);
  }
}
