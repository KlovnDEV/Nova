import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { Range, Box } from 'libs/UI';
// components
import { Card, BudgetChart, Preloader } from 'components';
// utils
import { formatMoney } from 'utils';
import State from './State';
import s from './Summary.module.scss';

const SummaryBalance = () => {
  return <p className={s.DashboardBalance}>{formatMoney(State?.Budget?.government || 0)}</p>;
};

const SummaryOrganizations = () => {
  const history = useHistory();

  return State.Organizations.map(e => (
    <Box key={e.name} flex="row" className={s.DashboardOrganization}>
      <div className={s.DashboardOrganizationWrapper}>
        <p className={s.DashboardOrganizationName}>{e.title}</p>
        <p className={s.DashboardOrganizationLeader}>{e.owner}</p>
      </div>
      <div className={s.DashboardOrganizationBox}>
        <div className={s.DashboardOrganizationDetailsWrapper}>
          <p className={s.DashboardOrganizationBalance}>
            {State.Budget && formatMoney(State.Budget[e.name] || 0)}
          </p>
          <p className={s.DashboardOrganizationBalanceDiff}>
            {e.income > 0 ? '+' : '-'}
            {formatMoney(Math.abs(e.income))}
          </p>
        </div>
        <Range
          // FIXME
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          value={e.taxPayFraction}
          min={0}
          max={100}
          onChange={() => {
            /* do nothing */
          }}
          // onChange={e => {
          //       handleSliderChange(e, data.name);
          //     }}
        />
      </div>
      <button
        className={s.DashboardButton}
        type="button"
        onClick={() => history.push(`/${e.name}/manage`)}
      >
        &gt;
      </button>
    </Box>
  ));
};

const Summary = observer(() => {
  const history = useHistory();

  useEffect(() => {
    State.updateOrganizations();
  }, []);

  return (
    <main className={s.DashboardWrapper}>
      <div className="">
        <Card header="Бюджет" className={s.DashboardBudget}>
          <Preloader event={State.assets.budgets} success={SummaryBalance} />
        </Card>
        <Card header="Организации" className={s.DashboardOrganizationCard} flex="column top">
          <Preloader event={State.assets.organizations} success={SummaryOrganizations} />
        </Card>
      </div>
      <div className="">
        <Card className={s.DashboardChart}>
          <Preloader
            event={State.assets.budgetHistory}
            success={BudgetChart}
            data={State.BudgetHistoryChart}
          />
        </Card>

        <Card header="Налоги" className={s.DashboardTax}>
          <Box elevation="0" className={s.DashboardTaxCard}>
            <span>Тип налога</span>
            <span>% ставка</span>
            <span>Сегодня</span>
          </Box>
          {State.tax &&
            State.tax.map(tax => (
              <Box key={tax.name} className={s.DashboardTaxCard}>
                <span>{tax.label}</span>
                <span> {tax.amount}%</span>
                <span>{tax.incomdeDay && formatMoney(tax.incomeDay)}</span>
              </Box>
            ))}
          <Box
            flex="column bottom"
            className={s.DashboardMoreButton}
            onClick={() => history.push('/government/tax')}
          >
            Подробнее
          </Box>
        </Card>
        <Card header="Топливо">
          <Box elevation="0" className={s.DashboardOilCard}>
            <span>Компания</span>
            <span>Цена</span>
          </Box>
          {State.oilCompanies.map(e => (
            <Box key={e.title} className={s.DashboardOilCard}>
              <span>{e.title}</span>
              <span>{formatMoney(e.price)}</span>
            </Box>
          ))}
          <Box
            flex="column bottom"
            className={s.DashboardMoreButton}
            onClick={() => history.push('/oil/stations')}
          >
            Подробнее
          </Box>
        </Card>
      </div>
    </main>
  );
});

export { Summary };
export default Summary;
