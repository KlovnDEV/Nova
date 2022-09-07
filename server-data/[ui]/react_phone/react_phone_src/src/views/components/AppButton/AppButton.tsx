// core
import React from 'react';
import { observer } from 'mobx-react';
// ui
import { Control } from 'libs/UI';
// style
import './AppButton.scss';

const AppButtonProto = React.forwardRef<HTMLDivElement, any>(function AppButtonInner(props, ref) {
  const { icon, label, onClick, focusState, ...rest } = props;

  let iconPath = icon;
  if (iconPath && iconPath.charAt(0) !== '/') iconPath = `assets/img/icons/${iconPath}`;

  return (
    <Control
      ref={ref}
      {...rest}
      onClick={onClick}
      className={$('app-button', rest.className || '')}
    >
      <img src={iconPath} alt="" />
      {label && <span>{label}</span>}
    </Control>
  );
});

export const AppButton = observer(AppButtonProto);

export default observer(AppButtonProto);
