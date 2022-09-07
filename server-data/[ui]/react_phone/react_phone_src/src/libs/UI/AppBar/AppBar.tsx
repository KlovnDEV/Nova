// core
import React from 'react';
// style
import './AppBar.scss';
import SvgIcon from '../SvgIcon/SvgIcon';

interface IProps extends React.ComponentProps<'div'> {
  left?: React.ReactChild;
  right?: React.ReactChild;
  onBack?: React.ComponentProps<'div'>['onClick'];
}

function AppBar(props: IProps): JSX.Element {
  const { children, onBack, left, right, className, ...rest } = props;

  return (
    <>
      <div className={$('app-bar', className || null)} {...rest}>
        <div className="app-bar__leftpane">
          {onBack && <SvgIcon onClick={onBack} src="ArrowBack" className="app-bar__backbutton" />}
          {left}
        </div>
        {children}
        <div className="app-bar__rightpane">{right}</div>
      </div>
    </>
  );
}

export default AppBar;
