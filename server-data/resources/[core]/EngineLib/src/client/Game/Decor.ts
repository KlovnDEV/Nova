
export enum DecorType {
  FLOAT = 1,
  BOOL = 2,
  INT = 3,
  Unk = 4,
  Time = 5
};
export class Decor {
  private handle: number;

  constructor(handle: number) {
    this.handle = handle;
  }

  exist(name: string): boolean {
    return DecorExistOn(this.handle, name);
  }

  static register(name: string, decorType: DecorType) {
    DecorRegister(name, decorType);
  }

  remove(name: string): boolean {
    return DecorRemove(this.handle, name);
  }

  getBool(name: string): boolean {
    return DecorGetBool(this.handle, name);
  }

  setBool(name: string, value: boolean): boolean {
    return DecorSetBool(this.handle, name, value);
  }

  getFloat(name: string): number {
    return DecorGetFloat(this.handle, name);
  }

  setFloat(name: string, value: number): boolean {
    return DecorSetFloat(this.handle, name, value);
  }

  getInt(name: string): number {
    return DecorGetInt(this.handle, name);
  }

  setInt(name: string, value: number): boolean {
    return DecorSetInt(this.handle, name, Math.round(value));
  }
}