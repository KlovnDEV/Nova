/* eslint-disable @typescript-eslint/no-explicit-any */
export type AnyObject = Record<string, any>;

export type CallbackArgsType = any[];
export type ClientCallbackFunction = { (...args: CallbackArgsType): any };
export type ServerCallbackFunction = { (playerHandle: number, ...args: CallbackArgsType): any };

export enum Sex {
  MALE = 0,
  FEMALE = 1,
}

export type PlayerIdentity = {
  firstname: string;
  lastname: string;
  sex: Sex;
  age: number;
  height: number;
};
