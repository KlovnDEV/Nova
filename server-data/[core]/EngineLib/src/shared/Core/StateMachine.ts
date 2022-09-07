import { assert } from "../Utils";

export class StateMachine {
  private state: string;
  states: Record<string, (...args: any[]) => Promise<string>>;

  constructor(states: Record<string, () => Promise<string>>, startState: string = "start") {
    this.state = startState;
    this.states = states;
  }
  
  async tick(...args) {
    assert(this.states[this.state])
    this.state = await this.states[this.state](...args) || this.state;
  }
}