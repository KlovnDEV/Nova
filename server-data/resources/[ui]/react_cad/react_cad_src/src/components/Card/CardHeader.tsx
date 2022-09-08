import React from 'react';
import { ICardHeader } from '../types';
import s from './Card.module.scss';

export function CardHeader({ labelText, actions }: ICardHeader): JSX.Element {
  return (
    <>
      <span>{labelText}</span>
      <div className={s.CardHeader}>
        {actions.map(action => (
          <button key={action.text} type="button" onClick={action.onClick}>
            <span>{action.text}</span>
            {action.icon}
          </button>
        ))}
      </div>
    </>
  );
}

export default CardHeader;
