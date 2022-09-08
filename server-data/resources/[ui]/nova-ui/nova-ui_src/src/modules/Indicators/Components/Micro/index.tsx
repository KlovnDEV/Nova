import React from 'react';

const Off = ({ color }): JSX.Element => (
  <path d="M14.4,5L5,14" stroke={color} strokeLinecap="round" strokeWidth="1" />
);

const Quiet = ({ color }): JSX.Element => (
  <path
    fill={color}
    d="M10,4.5c-2,0-3.6,1.6-3.6,3.6V11c0,1.8,1.3,3.2,3,3.5v1.3c-0.7,0.1-1.3,0.2-2,0.5C7,16.4,6.9,16.8,7,17.1   c0.1,0.3,0.5,0.5,0.8,0.3c1.5-0.6,2.9-0.6,4.3,0c0.3,0.1,0.7,0,0.8-0.3c0.1-0.3,0-0.7-0.3-0.8c-0.7-0.3-1.3-0.4-2-0.5v-1.3   c1.7-0.3,3-1.8,3-3.5V8.1C13.6,6.1,12,4.5,10,4.5z M12.3,11c-0.1,3.1-4.6,3.1-4.7,0V8.1c0.1-3.1,4.6-3.1,4.7,0V11z"
  />
);

const Regular = ({ color }): JSX.Element => (
  <>
    <path
      fill={color}
      d="M5.2,7.9c0,0.8-1.2,0.8-1.2,0c0-2.3,1.4-4.5,3.5-5.5c0.3-0.1,0.7,0,0.8,0.3c0.1,0.3,0,0.7-0.3,0.8  C6.2,4.3,5.2,6,5.2,7.9z"
    />
    <path
      fill={color}
      d="M16.1,7.9c0,0.8-1.2,0.8-1.3,0c0-1.9-1.1-3.6-2.8-4.4c-0.3-0.1-0.4-0.5-0.3-0.8c0.1-0.3,0.5-0.4,0.8-0.3  C14.7,3.4,16.1,5.6,16.1,7.9z"
    />
  </>
);

const Loud = ({ color }): JSX.Element => (
  <>
    <path
      fill={color}
      d="M3.2,5.2c0.3-0.6,0.6-1.2,1-1.8c0.2-0.3,0.2-0.7-0.1-0.9C3.9,2.3,3.5,2.4,3.3,2.7C2.8,3.3,2.4,4,2,4.7  c-0.1,0.3,0,0.7,0.3,0.8c0.1,0,0.2,0,0.2,0C2.9,5.6,3.1,5.4,3.2,5.2z"
    />
    <path
      fill={color}
      d="M17.6,5.5c0.3-0.1,0.5-0.5,0.3-0.8c-0.3-0.7-0.7-1.4-1.2-2.1c-0.2-0.3-0.6-0.3-0.9-0.1  c-0.3,0.2-0.3,0.6-0.1,0.9c0.4,0.5,0.8,1.1,1,1.8c0.1,0.2,0.3,0.4,0.6,0.4C17.5,5.6,17.5,5.6,17.6,5.5z"
    />
  </>
);

enum Mode {
  'off' = 0,
  'quiet' = 1,
  'regular' = 2,
  'loud' = 3,
}

const Micro = ({
  mode = 2,
  color = '#fff',
  className,
}: {
  mode?: Mode;
  color?: string;
  className?: string;
}): JSX.Element => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21" className={className}>
      {mode === 0 && <Off color={color} />}
      <Quiet color={color} />
      {mode > 1 && <Regular color={color} />}
      {mode > 2 && <Loud color={color} />}
    </svg>
  );
};

export { Micro };
export default Micro;
