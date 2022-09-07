import { DisabledControl } from './DisabledControl';
import { Controls, InputGroups } from './types';

export class Control {
  Disabled = DisabledControl;

  constructor() {
    throw new Error('Static class Control should not be instantiated!');
  }

  static JustReleased(control: Controls, inputGroup: InputGroups = InputGroups.INPUTGROUP_MOVE): boolean {
    return !!IsControlJustReleased(inputGroup, control);
  }

  static JustPressed(control: Controls, inputGroup: InputGroups = InputGroups.INPUTGROUP_MOVE): boolean {
    return !!IsControlJustPressed(inputGroup, control);
  }

  static Released(control: Controls, inputGroup: InputGroups = InputGroups.INPUTGROUP_MOVE): boolean {
    return !!IsControlReleased(inputGroup, control);
  }

  static Pressed(control: Controls, inputGroup: InputGroups = InputGroups.INPUTGROUP_MOVE): boolean {
    return !!IsControlPressed(inputGroup, control);
  }

  static Enabled(control: Controls, inputGroup: InputGroups = InputGroups.INPUTGROUP_MOVE): boolean {
    return !!IsControlEnabled(inputGroup, control);
  }

  static Normal(control: Controls, inputGroup: InputGroups = InputGroups.INPUTGROUP_MOVE): number {
    return GetControlNormal(inputGroup, control);
  }

  static Disable(control: Controls, inputGroup: InputGroups = InputGroups.INPUTGROUP_MOVE): void {
    DisableControlAction(inputGroup, control, true);
  }
}
