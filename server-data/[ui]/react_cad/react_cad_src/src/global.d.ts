// For CSS
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// For LESS
declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

// For SCSS
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

type SvgrComponent = React.FunctionComponent<React.SVGAttributes<SVGElement>>;
declare module '*.svg' {
  const value: SvgrComponent;
  export default value;
}

type AnyObject = Record<string, any>;

// ConcatClasses util
declare const $: any;
declare const ASSETS: string;
declare const DEVELOPMENT: boolean;
