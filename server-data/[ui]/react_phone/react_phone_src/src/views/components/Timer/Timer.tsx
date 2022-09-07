// core
import React, { useEffect, useState } from 'react';
// FIXME: Проставить типы
export function Timer(props) {
  const { startDate } = props;
  const timerStartDate = startDate || new Date();
  const [relativeDate, setRelativeDate] = useState(0);

  const toHHMMSS = secs => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor(secs / 60) % 60;
    const seconds = secs % 60;

    return [hours, minutes, seconds]
      .map(v => (v < 10 ? `0${v}` : v))
      .filter((v, i) => v !== '00' || i > 0)
      .join(':');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const secs = Math.floor((Date.now() - timerStartDate) / 1000.0);
      setRelativeDate(secs);
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <>
      <div>{toHHMMSS(relativeDate)}</div>
    </>
  );
}

export default Timer;
