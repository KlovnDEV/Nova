import React from 'react';
import { observer } from 'mobx-react';
// components
import { Card } from 'libs/UI';
// utils
import { numberWithSeparator } from 'utils';
import API from 'API';
import { imgReader } from 'utils/fileReaders';
// styles
import s from './index.local.scss';
// storage
import Store from './Storage';

const BankImgs = imgReader(require.context(`${ASSETS}/img/bank`, false, /^assets.*\.(png)$/));

const BankProto = () => {
  return (
    <div className={s.Wrapper}>
      <Card className={s.Card} width={500}>
        <div className={s.Body}>
          <div className={s.Title}>
            <img src={BankImgs[0].originalPath} alt="logo" />
            <p>Maze Bank</p>
          </div>
          <div className={s.Info}>
            <div className={s.Balance}>
              <p>Ваш баланс:&nbsp;</p>
              <p>${numberWithSeparator(Store.balance)}</p>
            </div>

            <div className={s.Cash}>
              <p>Наличные:&nbsp;</p>
              <p>${numberWithSeparator(Store.cash)}</p>
            </div>
          </div>

          <div className={s.Buttons}>
            <input
              type="text"
              value={Store.transferAmount}
              className={s.TextBox}
              onChange={e => {
                Store.transferAmount = e.target.value;
              }}
            />
            <button
              className={s.Button}
              type="button"
              onClick={() => {
                API.query('bank/withdraw', { amount: Number.parseInt(Store.transferAmount, 10) });
              }}
            >
              Снять наличные
            </button>
            <button
              className={s.Button}
              type="button"
              onClick={() => {
                API.query('bank/deposit', { amount: Number.parseInt(Store.transferAmount, 10) });
              }}
            >
              Положить в банк
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export const Bank = observer(BankProto);

export default Bank;
