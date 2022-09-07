import React from 'react';

// Range input
export const Range = props => (
  <div className="form-field__input">
    <input
      type="range"
      className="range-input"
      value={props.value}
      min={props.min}
      max={props.max}
      onChange={() => props.onChange(props.value)}
    />
  </div>
);
