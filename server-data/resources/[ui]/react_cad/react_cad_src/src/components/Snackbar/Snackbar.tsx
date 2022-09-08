// core
import React from 'react';
// components
import { Box } from 'libs/UI';
// types
import { ISnack } from '../types';
// styles
import style from './Snackbar.module.scss';

function SnackbarProto(props: ISnack): JSX.Element {
  const { className, text, open, category, ...rest } = props;

  if (!open) return null;

  return (
    <Box
      flex="row around"
      className={`${style.snackbar} ${style[`snackbar-${category}`]} ${className || ''}`}
      {...rest}
    >
      {text}
    </Box>
  );
}

export const Snackbar = SnackbarProto;
export default SnackbarProto;
