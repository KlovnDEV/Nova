/* eslint-disable no-restricted-syntax */
import React, { useEffect, useRef, useState } from 'react';

// styles

import { observer } from 'mobx-react';

export const PlayerStatusRange = observer(
  ({
    min,
    max,
    value,
    onApply,
  }: {
    min: number;
    max: number;
    value: number;
    onApply: { (value: number): void };
  }): JSX.Element => {
    const [current, setCurrent] = useState(value);
    const [changed, setChanged] = useState(false);

    // useEffect(() => {
    //   if (value != current) setChanged(true);
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [current]);
    // });

    useEffect(() => {
      if (!changed) setCurrent(value);
    }, [value]);

    return (
      <div style={{ width: 200, height: 20, display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: 80 }}>
          {changed ? (
            <button
              style={{ width: 60, marginRight: 15 }}
              onClick={() => {
                if (onApply) onApply(current);
                setChanged(false);
              }}
              type="button"
            >
              APPLY
            </button>
          ) : (
            <p>{+value.toFixed(2)}</p>
          )}
        </div>
        <input
          style={{ width: 120 }}
          type="range"
          min={min}
          max={max}
          value={current}
          onChange={e => {
            setCurrent(+e.target.value);
            setChanged(true);
          }}
        />
      </div>
    );
  },
);
export default PlayerStatusRange;
