import React from 'react';
import classNames from 'classnames/bind';
import s from './index.local.scss';
import { UICard } from '../@types';

function Card({ width, height, className, children, background }: UICard): JSX.Element {
  return (
    <div
      className={s.Card}
      style={{
        width: width || null,
        height: height || null,
      }}
    >
      <div
        className={classNames(s.CardBody, className)}
        style={{
          backgroundImage: background
            ? `linear-gradient(180deg, transparent 0%, transparent 47.5% , #101314 62.5%), url('${background}')`
            : null,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export { Card };
export default Card;
