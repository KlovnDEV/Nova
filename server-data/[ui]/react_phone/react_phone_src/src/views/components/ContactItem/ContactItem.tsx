// core
import React, { ReactChild } from 'react';
// types
import { IProps as ListItemProps } from 'libs/UI/ListItem';
// ui
import { SvgIcon, ListItem } from 'libs/UI';
// components
import { Avatar } from 'views/components/Avatar';
// styles
import './ContactItem.scss';

interface IProps extends ListItemProps {
  letter?: string;
  name: string;
  description?: ReactChild;
  contact: IContact;
  onCallClick?: React.ComponentProps<'div'>['onClick'];
}

export function ContactItem(props: IProps): JSX.Element {
  const { letter, name, right, description, onCallClick, className, contact, ...rest } = props;

  return (
    <ListItem
      className={`contact ${className || ''}`}
      left={
        <>
          {letter && <div className="contact__letter">{letter}</div>}
          <Avatar className="contact__avatar" contact={contact} />
        </>
      }
      header={<div className="contact__name">{name}</div>}
      right={
        <>
          {onCallClick && (
            <SvgIcon
              onClick={onCallClick}
              className="contact__call-button"
              fill="#000"
              src="phone"
            />
          )}
          {right}
        </>
      }
      {...rest}
    >
      {description && <div className="contact__description">{description}</div>}
    </ListItem>
  );
}

export { IProps };

export default ContactItem;
