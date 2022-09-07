/* eslint-disable react/display-name */
// core
import React, { useState } from 'react';
import { observer } from 'mobx-react';
// components
import { Range, Box } from 'libs/UI';
import { Preloader, Card, BudgetChart } from 'components';
// style
import s from './Tax.module.scss';
// storage
import StateProto from './State';

function Tax() {
  const [State] = useState(() => new StateProto());
  const [TaxListPromise] = useState(() => State.getTaxList());
  const handleSliderChange = (e, taxName) => {
    const value = parseInt(e.target.value, 10);

    State.setTaxAmount(value, taxName);
  };

  function getData(arr) {
    const datasets = arr.map(tax => ({
      label: tax.label,
      data: [],
      fill: false,
      backgroundColor: tax.color,
      borderColor: tax.color,
    }));

    return datasets;
  }

  console.log('dataset', getData(State.tax));

  return (
    <div className={s.taxContent}>
      <Card header="Налоги" className={s.DashboardTax} flex="column top center">
        <Box elevation="0" className={s.DashboardTaxCard}>
          <span>Тип налога</span>
          <span>% ставка</span>
        </Box>
        <Preloader event={TaxListPromise}>
          {State.tax.map(tax => (
            <Box key={tax.name} className={s.DashboardTaxCard}>
              <div className="">
                <strong>
                  <p>{tax.label}</p>
                </strong>
                <p>{tax.description}</p>
              </div>
              <div className="">
                <Range
                  value={tax.amount}
                  min={0}
                  max={50}
                  style={{ margin: '16px 0' }}
                  onChange={e => {
                    handleSliderChange(e, tax.name);
                  }}
                />
                <p>{tax.amount} %</p>
              </div>
            </Box>
          ))}
        </Preloader>
      </Card>
      <Box className={s.taxChart}>
        <Preloader event={TaxListPromise}>
          <BudgetChart data={getData(State.tax)} responsive maintainAspectRatio={false} />
        </Preloader>
      </Box>
    </div>
  );
}

export default observer(Tax);
