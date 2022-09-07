export class SubscribeTarget<T extends any[]> {
  private subscribers: Array<(...args: T) => any> = [];

  subscribe(func: (...args: T) => any) {
    this.subscribers.push(func);
  }

  unsubscribe(func: (...args: T) => any) {
    const index = this.subscribers.indexOf(func);
    if (index == -1) return false;

    this.subscribers.splice(index, 1);
    return true;
  }

  emit(...args: T): void {
    this.subscribers.forEach((sub: (...args: T) => any) => { sub(...args) });
  }
}