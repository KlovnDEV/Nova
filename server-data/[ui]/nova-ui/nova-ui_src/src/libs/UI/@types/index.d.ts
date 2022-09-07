import React, {
  ReactChild,
  FocusEventHandler,
  ChangeEventHandler,
  KeyboardEventHandler,
  CSSProperties,
  Ref,
  MouseEventHandler,
  ReactNode,
  Key,
  ReactFragment,
  ReactPortal,
} from 'react';

export type UIButton = {
  children: ReactChild | ReactChild[];
  className?: string | string[];
  active?: boolean;
  variant: 'rounded' | 'rect';
  onFocus?: FocusEventHandler<HTMLButtonElement>;
  onBlur?: FocusEventHandler<HTMLButtonElement>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseOver?: MouseEventHandler<HTMLButtonElement>;
  onMouseOut?: MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  innerRef?: Ref<HTMLButtonElement>;
  style?: CSSProperties;
  disabled?: boolean;
};

export type UIButtonGroup = {
  children: Array<ReactChild>;
  direction?: 'row' | 'column';
  className?: string | string[];
  style?: CSSProperties;
};

export type UIGrid = {
  children: boolean | ReactChild | ReactFragment | ReactPortal;
  cols?: number;
  itemSize?: number;
  gap?: number | [number, number];
  justify?: 'left' | 'center' | 'right';
};

export type UIIcon = {
  name: string | string[];
  fill?: string;
  className?: string | string[];
};

export type UIInputField = {
  name: string;
  type?: 'number' | 'text';
  placeholder?: string;
  value?: number | string;
  className?: string | string[];
  labelText?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyUp?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyPress?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  multiline?: boolean;
  textareaRef?: React.MutableRefObject<HTMLTextAreaElement>;
};

export type UILineProgress =
  | {
      value: number;
      maxValue: number;
      color: string;
      backgroundImage?: string;
      transitionDuration?: string;
      className?: string | string[];
    }
  | {
      value: number;
      maxValue: number;
      color?: string;
      backgroundImage: string;
      transitionDuration?: string;
      className?: string | string[];
    };

export type UIRange = {
  name: string;
  displayName?: string;
  value?: number | string;
  min?: number;
  max?: number;
  step?: number;
  className?: string | string[];
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onIncrease?: MouseEventHandler<HTMLLabelElement>;
  onDecrease?: MouseEventHandler<HTMLLabelElement>;
  slotCounter?: ReactChild;
};

export type UICircularRange = {
  width: number;
  strokeWidth: number;
  value: number;
  fillProgress?: string;
  fillBackground?: string;
  className?: string;
  angleRange?: number;
};

export type UITabs = {
  pages: UITabControls['pages'];
  children: Array<UITabContent['item']>;
  searchFunc?: { (e: React.ChangeEvent): void };
  align?: 'left' | 'center' | 'right';
  contentWrapperClass?: string;
  parentWrapperClass?: string;
  size?: number;
  fade?: 'left' | 'bottom' | 'right' | 'none' | undefined;
  variant?: 'top' | 'left' | 'right';
  labels?: boolean;
  controlFillColor?: string | undefined;
  activeTab: string;
  setActiveTab: { (name: string): void };
};

export type UITabControls = {
  pages: { name: string; icon: string; label?: string }[];
  action: { (e: string): void };
  activeTab: string;
  align?: 'left' | 'center' | 'right';
  size?: number;
  labels?: boolean;
  variant?: UITabs['variant'];
  fill?: UITabs['controlFillColor'];
};

export type UITabContent = {
  item: JSX.Element;
  anchor: Key;
  className: UITabs['contentWrapperClass'];
  fade: UITabs['fade'];
  active: boolean;
};

export type UICard = {
  width?: number;
  height?: number;
  className?: string;
  children: ReactChild | ReactChild[];
  background?: string;
};
