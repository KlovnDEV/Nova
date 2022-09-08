// core
import React from 'react';
import { observer } from 'mobx-react';
// ui
import Control, { IProps as ControlProps } from '../Control/Control';
import SvgIcon from '../SvgIcon/SvgIcon';
// styles
import './ListItem.scss';

interface IProps extends ControlProps {
  header?: React.ReactNode;
  icon?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  focusState?: IFocusData;
}

function ListItem(props: IProps): JSX.Element {
  const { header, children, focusState, icon, left, right, className, ...rest } = props;
  // const focused = useFocus(focusState, rest.onClick);

  return (
    <Control className={$('list-item', className || '')} {...rest}>
      <div className="list-item__left">
        {icon && (
          <div className="list-item__icon">
            <SvgIcon width="70%" fill="#555" src={icon} />
          </div>
        )}
        {left}
      </div>
      <div className="list-item__main">
        <div className="list-item__title">{header}</div>
        <div className="list-item__content">{children}</div>
      </div>
      <div className="list-item__right">{right}</div>
    </Control>
  );
}

export { IProps };

export default observer(ListItem);
