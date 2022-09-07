// For CSS
declare module '*.local.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// For LESS
declare module '*.local.less' {
  const classes: { [key: string]: string };
  export default classes;
}

// For SCSS
declare module '*.local.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare type AnyObject = Record<string, any>;

// ConcatClasses util
declare const $: any;
declare const ASSETS: string;
declare const DEVELOPMENT: boolean;

interface IContact {
  id: number;
  name: string;
  last_name?: string;
  email?: string;
  gender?: string; // 'Male' | 'Female';
  favorite?: boolean;
  avatar?: string;
  phone?: string;
}

interface IRecent {
  id: number;
  sim_number: string;
  from_number: string;
  last_call: number;
  duration?: number;
  contact?: IContact;
  phone?: string; // "не наш" номер телефона, не должен присутствовать в БД
  incoming?: boolean;
  declined?: boolean;
}

interface IFocusData {
  name: string;
  left?: string;
  right?: string;
  up?: string;
  down?: string;
  enter?: string;
}

interface IMessage {
  id?: number;
  sim_number: string;
  from_number: string;
  message: string;
  created?: Date;
  phone: string;
  date?: number;
  text?: string;
  contact?: IContact;
}

interface IFocusable {
  focus?: IFocusData;
}

declare type APIResponse =
  | import('axios').AxiosResponse
  | { status: number; data?: AnyObject | string };
