// core
import React from 'react';
// components
import { Box } from 'libs/UI';
// types
import { ICard } from '../types';
// styles
import style from './Card.module.scss';

export function Card({
  header,
  children,
  backgroundColor,
  flex,
  className,
  elevation,
  ...rest
}: ICard): JSX.Element {
  return (
    <Box
      flex="column"
      className={`${style.card} ${className || ''}`}
      elevation={elevation !== undefined ? elevation : 2}
      style={{
        backgroundColor,
      }}
      {...rest}
    >
      {header && (
        <Box className={`${style.cardHead} ${style.card}`} elevation={0}>
          {header}
        </Box>
      )}
      <Box flex={flex || 'column center left'} className={style.cardBody}>
        {children}
      </Box>
    </Box>
  );
}

export default Card;
