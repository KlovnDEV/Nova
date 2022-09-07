import { Props as BoxProps } from 'libs/UI/Box/Box.d';
import { ReactElement, ReactNode } from 'react';

export interface ISnack extends Partial<BoxProps> {
  className?: string;
  text: string;
  open: boolean;
  category: 'error' | 'warn' | 'info' | 'success';
}

export interface ICard extends BoxProps {
  header?: ReactNode;
  backgroundColor?: string;
}

export interface ICardHeader {
  labelText: string;
  actions: Array<any>;
}
