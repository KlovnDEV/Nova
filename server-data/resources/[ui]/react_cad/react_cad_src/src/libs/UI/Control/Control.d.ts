interface IFocus {
  name: string;
  left?: string;
  right?: string;
  up?: string;
  down?: string;
  enter?: string;
}

interface IProps {
  children: React.ReactNode;
  className?: string;

  tabIndex?: number;
  ripple?: boolean;
  focus?: IFocus;
  [x: string]: any;
}

export { IFocus, IProps };
