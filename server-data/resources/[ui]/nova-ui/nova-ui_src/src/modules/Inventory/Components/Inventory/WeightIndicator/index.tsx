import React from 'react';
// styles
import s from './index.local.scss';

type IProps = { value: number; maxValue: number };

const WeightIndicator = ({ value, maxValue }: IProps): JSX.Element => {
  if (!value || !maxValue) {
    return null;
  }

  const computeValue = (): { maxWidth: string; backgroundColor: string } => {
    const compVal = (value / maxValue) * 100;
    const high = '#D2534B';
    const med = '#FDD93F';
    const low = '#77D24B';

    const bg = (): '#D2534B' | '#77D24B' | '#FDD93F' => {
      if (compVal > 60) {
        return high;
      }
      if (compVal < 30) {
        return low;
      }

      return med;
    };

    return {
      maxWidth: `${compVal}%`,
      backgroundColor: bg(),
    };
  };

  return (
    <div className={s.IndicatorWrapper}>
      <div className={s.Indicator}>
        <div className={s.IndicatorFiller} style={computeValue()} />
      </div>
    </div>
  );
};

export { WeightIndicator };
export default WeightIndicator;
