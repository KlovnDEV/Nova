import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
// components
import { BudgetChart, Card, Preloader } from 'components';
import * as T from 'types';
// utils
import { error, formatMoney, API } from 'utils';
// styles
import s from './Manage.module.scss';
// state
import State from './State';
// tables
import SalaryTable from './SalaryTable';
import Employees from './Employees';

function getData(org: T.Organization, budgetHistory: any) {
  if (!org) return [];

  return [
    {
      label: org.title,
      data: budgetHistory,
      fill: false,
      backgroundColor: org.color,
      borderColor: org.color,
    },
  ];
}

const ManageHeader = ({ permissions }) => {
  return (
    <>
      <img className={s.HeaderImg} src={State.org.icon} alt="" />
      <p className={s.HeaderTitle}>{State.org.title}</p>
      {permissions?.leader && (
        <div className={s.HeaderOwnerWrapper}>
          <p className={s.HeaderOwner}>{State.org.owner}</p>
          <button className={s.HeaderOwnerAction} type="button">
            Уволить
          </button>
        </div>
      )}
    </>
  );
};

const ManageBudgetHistory = () => {
  return (
    <>
      {State?.budgetHistory && State?.org && (
        <BudgetChart data={getData(State.org, State.budgetHistory)} />
      )}
    </>
  );
};

const ManageBudget = () => {
  return (
    <>
      <p className={s.MainBudgetTitle}>{formatMoney(State.org?.budget || 0)}</p>
      <p className={s.MainBudgetRow}>
        Сегодня:
        <span>+ 10 000</span>
      </p>
      <p className={s.MainBudgetRow}>
        За неделю:
        <span>+ 20 000</span>
      </p>
      <Preloader
        event={Promise.all([State.assets.budgetHistory, State.assets.organization])}
        success={ManageBudgetHistory}
      />
    </>
  );
};

const Manage = ({ orgName }: { orgName: string }) => {
  useEffect(() => {
    State.updateOrganization(orgName);
  }, [orgName]);

  const onSalaryChange = (grade: number, salary: number): Promise<void> => {
    API.query('jobsChangeSalary', {
      role: State.org.name,
      grade: grade,
      salary: salary,
    })
      .then(() => {
        State.updateGrades(orgName);
      })
      .catch(err => {
        console.log(err);
        error('Невозможно изменить заработную плату!');
      });

    return new Promise(resolve => resolve());
  };

  const managePermissions = State.org?.permissions?.manage;

  return (
    <div className={s.Wrapper}>
      <Card>
        <div className={s.Header}>
          <Preloader
            event={State.assets.organization}
            success={ManageHeader}
            permissions={managePermissions}
          />
        </div>
      </Card>
      <main className={s.Main}>
        <div className="">
          <Card header="Бюджет" className={s.MainBudget} flex="column top center">
            <Preloader event={State.assets.organization} success={ManageBudget} />
          </Card>
        </div>
        <div>
          <Preloader event={State.assets.organization} success={Employees} />
          <Preloader
            event={State.assets.organization}
            success={SalaryTable}
            onSalaryChange={onSalaryChange}
          />
        </div>
      </main>
    </div>
  );
};

export default observer(Manage);
