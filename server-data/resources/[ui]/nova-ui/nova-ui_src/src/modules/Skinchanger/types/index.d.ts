import { MouseEventHandler, ReactChild, ReactFragment, ReactPortal } from 'react';

export type IGridItem = {
  children: boolean | ReactChild | ReactFragment | ReactPortal;
  name: string;
  value: number | string;
  active?: boolean;
  onClick?: MouseEventHandler<HTMLInputElement>;
  variant?: 'rect' | 'circle';
  className?: string;
};
