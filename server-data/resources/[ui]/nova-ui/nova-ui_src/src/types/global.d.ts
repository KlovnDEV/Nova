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

type SvgrComponent = React.FunctionComponent<React.SVGAttributes<SVGElement>>;
declare module '*.svg' {
  const value: SvgrComponent;
  export default value;
}

type AnyObject = Record<string, any>;
type AxiosResponse = import('axios').AxiosResponse;
type APIResponse = AxiosResponse | { status: number; data?: AnyObject | string };

// ConcatClasses util
declare const ASSETS: string;
declare const DEVELOPMENT: boolean;
declare const DEVELOPMENT_WATCH: boolean;
