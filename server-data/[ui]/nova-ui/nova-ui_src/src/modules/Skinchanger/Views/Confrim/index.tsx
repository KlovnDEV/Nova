import React from 'react';
import API from 'API';
import { observer } from 'mobx-react';
import s from './index.local.scss';
import Storage from '~m/Skinchanger/Storage';

const Confirm = observer((): JSX.Element => {
  const { apply, setActiveTab, name, lastname, age } = Storage;

  return (
    <div className={s.Wrpapper}>
      <button type="button" className={s.Button} onClick={() => setActiveTab('register')}>
        <span className={s.ButtonDecline} />
        <span className="inherit">Вернуться</span>
      </button>
      <button
        type="button"
        className={s.Button}
        disabled={!name || !lastname || !age}
        onClick={() => {
          if (DEVELOPMENT) {
            setActiveTab('register');
          } else {
            apply();
            API.query('skin/hide', {});
          }

          return true;
        }}
      >
        <span className={s.ButtonConfirm} />
        <span className="inherit">Создать персонажа</span>
      </button>
    </div>
  );
});

export { Confirm };
export default Confirm;
