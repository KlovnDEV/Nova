import React from 'react';
import { observer } from 'mobx-react';
import { Range } from 'libs/UI';
import { UIRange } from 'libs/UI/@types';
import { useSetRangeValue } from 'utils/useSetRangeValue';
import { useChangeRangeValue } from 'utils/useChangeRangeValue';

interface IRangeProto extends UIRange {
  setter: { (target: string, value: string | number | boolean) };
  getter: { (target: number | string): number | string };
  className?: string;
  initialValue?: string;
  showCounter?: boolean;
}

const RangeProto = ({
  name,
  displayName,
  setter,
  getter,
  min,
  max,
  initialValue = '0',
  showCounter = false,
  className,
}: IRangeProto): JSX.Element => {
  const setRange = useSetRangeValue(setter, getter, name, min, max);

  const changeRange = useChangeRangeValue(setter, getter, name, min, max);
  return (
    <Range
      name={name}
      displayName={displayName}
      min={min}
      max={max}
      value={getter(name) !== undefined ? getter(name) : setRange(initialValue, true)}
      onChange={e => setRange(e.target.value, false)}
      onDecrease={() => changeRange(-1)}
      onIncrease={() => changeRange(1)}
      className={className}
      slotCounter={
        showCounter ? (
          <span>
            {getter(name)} / {max}
          </span>
        ) : null
      }
    />
  );
};

const MappedRange = observer(RangeProto);

export { MappedRange };
export default MappedRange;
