export type LiquidInfo = {
  name: string;
  amount: number;
};

export class Liquid {
  state: StateBagInterface;
  max: number;

  constructor(state: StateBagInterface, max: number) {
    this.state = state;
    this.max = max;
  }

  get current(): LiquidInfo {
    return this.state.liquid || { name: 'none', amount: 0 };
  }

  set(name: string, amount: number): void {
    this.state.liquid = { name, amount };
  }

  has(name: string, amount?: number): boolean {
    const { current } = this;

    if (current.name != name) return false;
    if (amount && current.amount < amount) return false;

    return true;
  }

  add(name: string, amount: number): boolean {
    if (amount < 0) return false;

    const { current } = this;

    if (current.name != name && current.amount > 0) {
      return false;
    }

    if (current.amount + amount > this.max) return false;

    this.set(name, amount + current.amount);
    return true;
  }

  sub(name: string, amount: number): boolean {
    if (amount < 0) return false;

    const { current } = this;

    if (current.amount < amount) return false;

    this.set(name, current.amount - amount);
    return true;
  }
}
