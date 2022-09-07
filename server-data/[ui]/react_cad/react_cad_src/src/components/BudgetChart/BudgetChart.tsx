// core
import React, { useState } from 'react';

import { Line } from 'react-chartjs-2';
import { observer } from 'mobx-react';
import { Box } from 'libs/UI';
import { isNull, isUndefined } from 'underscore';

function Chart({ data, ...rest }): JSX.Element {
  const [units, setUnits] = useState('day');

  const res = [];

  const groupingFilter = () => {
    data.forEach(org => {
      const newOrg = { ...org };
      newOrg.data = org.data.filter(elem => {
        switch (units) {
          case 'day':
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return (new Date() - elem.t) / 60 / 60 / 24 / 1000 < 30;
          case 'week':
            return elem.t.getDay() == 1;
          case 'month':
            return elem.t.getDate() == 1;
          default:
            return false;
        }
      });

      res.push(newOrg);
    });

    return res;
  };

  const onUnitsChanged = event => {
    setUnits(event.target.value);
  };

  const lineOptions = {
    ...rest,

    animation: {
      duration: 0,
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          distribution: 'series',
          offset: true,
          ticks: {
            major: {
              enabled: true,
              fontStyle: 'bold',
            },
            source: 'data',
            autoSkip: true,
            autoSkipPadding: 75,
            maxRotation: 0,
            sampleSize: 100,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            drawBorder: false,
          },
          scaleLabel: {
            display: true,
            labelString: 'Бюджет ($)',
          },
        },
      ],
    },
  };

  return (
    <>
      <Line
        data={{
          datasets: !isNull(data) && !isUndefined(data) && data.length > 0 ? groupingFilter() : [],
        }}
        options={lineOptions}
      />
      <Box flex="row center" style={{ width: '100%' }}>
        <label htmlFor="budgetHistoryDetail1">
          <input
            checked={units == 'day'}
            name="budgetHistoryDetail"
            id="budgetHistoryDetail1"
            type="radio"
            value="day"
            onChange={onUnitsChanged}
          />
          &nbsp;Дни
        </label>
        <label style={{ margin: '0 10px' }} htmlFor="budgetHistoryDetail2">
          <input
            checked={units == 'week'}
            name="budgetHistoryDetail"
            type="radio"
            value="week"
            id="budgetHistoryDetail2"
            onChange={onUnitsChanged}
          />
          &nbsp;Недели
        </label>
        <label htmlFor="budgetHistoryDetail3">
          <input
            checked={units == 'month'}
            name="budgetHistoryDetail"
            id="budgetHistoryDetail3"
            type="radio"
            value="month"
            onChange={onUnitsChanged}
          />
          &nbsp;Месяцы
        </label>
      </Box>
    </>
  );
}

export const BudgetChart = Chart;
export default BudgetChart;
