import React, { useEffect, useState } from 'react';
// components
import { Button } from 'libs/UI';
// styles
import s from './index.local.scss';

function display(seconds: number) {
  const format = (val: number) => `0${Math.floor(val)}`.slice(-2);
  const minutes = (seconds % 3600) / 60;

  return [minutes, seconds % 60].map(format).join(':');
}

export const DeathScreen = (): JSX.Element => {
  const [counter, setCounter] = useState(900);

  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <div className={s.screen__death}>
      <div className={s.timer__wrapper}>
        <p className={s.timer__header}>До смерти осталось</p>
        <p className={s.timer}>{display(counter)}</p>
        <div className={s.separator} />
      </div>
      <div className={s.info}>
        <h2 className={s.info__header}>Вы потеряли сознание!</h2>
        <p className={s.info__text}>Это случилось из-за некоторых повреждений</p>
      </div>
      <div className={s.actions}>
        <p className={s.info__text}>Если помощи долго нет, выберете следующие действия:</p>
        <div className={s.actions__btns}>
          <div className={s['actions__btns-group']}>
            <Button disabled={counter > 600} variant="rect">
              Очевидцы вызвали скорую помощь
            </Button>
            <p style={{ opacity: counter > 600 ? 1 : 0 }} className={s.info__text}>
              Будет активно через: {display(counter - 600)} с.
            </p>
          </div>
          <div className={s['actions__btns-group']}>
            <Button disabled={counter > 0} variant="rect">
              Парамедики доставили вас в больницу
            </Button>
            <p style={{ opacity: counter > 0 ? 1 : 0 }} className={s.info__text}>
              Будет активно через: {display(counter)} с.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeathScreen;
