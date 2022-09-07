import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import { Icon, CircularProgress } from 'libs/UI';
import s from './index.local.scss';

type IProps = {
  icon?: string;
  value: number;
  className?: string | null;
  width?: number;
  color: string;
  children?: React.ReactChild | React.ReactChild[];
};

const IndicatorProto = ({
  icon,
  value,
  className = null,
  color,
  width = 54,
  children,
}: IProps): JSX.Element => {
  return (
    <div className={classNames(s.ProgressWrapper, className)}>
      <CircularProgress
        width={width}
        strokeWidth={3}
        value={value}
        fillProgress={color}
        // fillBackground="#ffffff19"
        className={s.Progress}
      />
      {icon && <Icon className={classNames(s.Icon, s.Shadowed)} name={icon} fill={color} />}
      {children}
    </div>
  );
};

export const Indicator = observer(IndicatorProto);
export default Indicator;
