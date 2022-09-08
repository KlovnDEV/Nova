import React from 'react';
import { ButtonGroup, Button, Icon } from 'libs/UI';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import s from './PayForm.local.scss';
import { PayFormStorage } from './Storage';

function PayFormProto({
  buyClick,
  total,
  className,
}: {
  buyClick: (account: 'bank' | 'cash') => void;
  total: number;
  className?: string;
}) {
  const { format } = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return (
    <div className={classnames(s.PayForm, className)}>
      <div className={s.PayFormGroup}>
        <p className={s.PayFormHeader}>Способ оплаты</p>
        <ButtonGroup className={s.PayFormButtonGroup}>
          <Button className={s.PayFormButton} variant="rect" onClick={() => buyClick('bank')}>
            <Icon className={s.PayFormButtonIcon} name="icon-credit" />
            Карта
          </Button>
          <Button className={s.PayFormButton} variant="rect" onClick={() => buyClick('cash')}>
            <Icon className={s.PayFormButtonIcon} name="icon-wallet" />
            Наличные
          </Button>
        </ButtonGroup>
        <div className={s.PayFormMoney}>
          <p>{format(PayFormStorage.bank)}</p>
          <p>{format(PayFormStorage.cash)}</p>
        </div>
      </div>
      <div className={s.PayFormGroup}>
        <p className={s.PayFormHeader}>Итого</p>
        <p className={s.PayFormTotal}>{format(total)}</p>
      </div>
    </div>
  );
}

export const PayForm = observer(PayFormProto);
export default PayForm;
