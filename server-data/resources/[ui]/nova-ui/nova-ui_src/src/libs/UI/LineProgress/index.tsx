import React from 'react';
import classNames from 'classnames/bind';
import { UILineProgress } from '../@types';
// styles
import s from './index.local.scss';

const LineProgress = ({
  value,
  maxValue,
  color,
  backgroundImage,
  className,
  transitionDuration = '0.3s',
}: UILineProgress): JSX.Element => {
  if (!value || !maxValue) {
    return null;
  }

  const computeValue = (): string => `${Math.min((value / maxValue) * 100, 100)}%`;

  return (
    <div className={classNames(s.IndicatorWrapper, className)}>
      <div className={s.Indicator}>
        <div
          className={s.IndicatorFiller}
          style={{
            maxWidth: computeValue(),
            backgroundColor: color,
            backgroundImage: backgroundImage,
            transitionDuration: transitionDuration,
          }}
        />
      </div>
    </div>
  );
};

export { LineProgress };
export default LineProgress;
