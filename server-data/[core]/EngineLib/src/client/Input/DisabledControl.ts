import { Controls, InputGroups } from './types';

export class DisabledControl {
  constructor() {
    throw new Error('Static class DisabledControl should not be instantiated!');
  }

  static JustReleased(control: Controls, inputGroup: InputGroups = InputGroups.INPUTGROUP_MOVE): boolean {
    return !!IsDisabledControlJustReleased(inputGroup, control);
  }

  static JustPressed(control: Controls, inputGroup: InputGroups = InputGroups.INPUTGROUP_MOVE): boolean {
    return !!IsDisabledControlJustPressed(inputGroup, control);
  }

  static Released(control: Controls, inputGroup: InputGroups = InputGroups.INPUTGROUP_MOVE): boolean {
    return !!IsDisabledControlReleased(inputGroup, control);
  }

  static Pressed(control: Controls, inputGroup: InputGroups = InputGroups.INPUTGROUP_MOVE): boolean {
    return !!IsDisabledControlPressed(inputGroup, control);
  }

  static Normal(control: Controls, inputGroup: InputGroups = InputGroups.INPUTGROUP_MOVE): number {
    return GetDisabledControlNormal(inputGroup, control);
  }

  static Enable(control: Controls, inputGroup: InputGroups = InputGroups.INPUTGROUP_MOVE): void {
    DisableControlAction(inputGroup, control, false);
  }
}
