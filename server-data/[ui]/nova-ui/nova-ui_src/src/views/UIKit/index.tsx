import React from 'react';
// components
import { InputField, Button, Icon, ButtonGroup, Range, Card } from 'libs/UI';
// styles
import s from './index.local.scss';

const UIKit = (): JSX.Element => {
  return (
    <div className={s.Wrapper}>
      <div className={s.Row}>
        <InputField type="text" name="name" labelText="first" />
        <InputField type="text" name="name2" className={['zhope asd', 'a']} placeholder="asd" />
        <InputField type="number" name="name3" labelText="third" />
      </div>
      <div className={s.Row}>
        <div style={{ width: 64, height: 64 }}>
          <Button variant="rect">
            <span className="inherit">ex</span>
          </Button>
        </div>
        <div style={{ width: 64, height: 64 }}>
          <Button variant="rounded" active>
            <span className="inherit">ex</span>
          </Button>
        </div>
        <div style={{ width: 64, height: 64 }}>
          <Button variant="rounded" active>
            <Icon name="idcard" fill="#fff" />
          </Button>
        </div>
        <div style={{ width: 64, height: 64 }}>
          <Button variant="rounded">
            <Icon name="idcard" fill="#fff" />
          </Button>
        </div>
      </div>
      <div className={s.Row}>
        <div style={{ width: 64, height: 64 }}>
          <Icon name="idcard" fill="red" />
        </div>
        <div style={{ width: 64, height: 64 }}>
          <Icon name="man" fill="blue" />
        </div>
        <div style={{ width: 64, height: 64 }}>
          <Icon name="woman" fill="pink" />
        </div>
      </div>
      <div className={s.Row}>
        <ButtonGroup>
          <Button variant="rect">
            <span className="inherit">ex</span>
          </Button>
          <Button variant="rect" active>
            <span className="inherit">ex</span>
          </Button>
        </ButtonGroup>
        <ButtonGroup direction="row">
          <Button variant="rect">
            <span className="inherit">ex</span>
          </Button>
          <Button variant="rect" active>
            <span className="inherit">ex</span>
          </Button>
        </ButtonGroup>
      </div>
      <div className={s.Row}>
        <div style={{ gridColumn: '1/3' }}>
          <Range name="asd" value={1} slotCounter="qwe" onChange={e => e} />
        </div>
      </div>
      <Card background={`${ASSETS}/img/gas-station/xero/1.png`}>Card</Card>
    </div>
  );
};

export default UIKit;
