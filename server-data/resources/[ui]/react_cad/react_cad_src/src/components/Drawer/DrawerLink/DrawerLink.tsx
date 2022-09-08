// core
import React from 'react';
import { Link } from 'react-router-dom';
// components
// styles
import style from './DrawerLink.module.scss';
// FIXME : проставить типы
function DrawerLinkProto({ name, icon, path, collapse }): JSX.Element {
  return (
    <Link to={path} className={style.linkWrapper} title={name}>
      <div className={style.linkIcon}>{icon}</div>
      <span className={`${collapse} ${style.linkName}`}>{name}</span>
    </Link>
  );
}

export const DrawerLink = DrawerLinkProto;
export default DrawerLink;
