// core
import React from 'react';
// components
import ListItem, { IProps as ListItemProps } from '../ListItem/ListItem';
// styles
import './MenuListItem.scss';

interface IProps extends ListItemProps {
  name?: string;
  description?: string;
}

function MenuListItem(props: IProps): JSX.Element {
  const { name, description, icon, className, ...rest } = props;

  return (
    <ListItem icon={icon} header={<div className="menu-list-item__name">{name}</div>} {...rest}>
      {description && <div className="menu-list-item__description">{description}</div>}
    </ListItem>
  );
}

export default MenuListItem;
