import { makeAutoObservable, action, observable } from 'mobx';
// types
import { Column } from 'material-table/types';
import { API, error } from 'utils';
import * as T from 'types';
// utils
import { MainStore } from 'storage/MainStore';

class StateProto {
  constructor() {
    makeAutoObservable(this);
  }

  @observable assets = {} as {
    organization: Promise<any>;
    budgetHistory: Promise<any>;
    budget: Promise<any>;
    grades: Promise<any>;
    employees: Promise<any>;
  };

  @observable org: T.Organization = null;

  @observable grades: T.EmployeeGrade[] = null;

  @observable employees: T.Employee[] = null;

  @observable budgetHistory: T.BudgetHistoryEntry[] = null;

  @observable budget = null;

  @action updateOrganization = (name: string) => {
    this.assets.organization = API.query('organizations/get', { name }).then(response => {
      const e = { ...response.data[0] };

      // FIXME
      e.icon = `${ASSETS}/img/logo/${name}.png`;
      e.owner = 'ABC';
      e.income = 1000;
      e.taxPayFraction = 25;
      e.permissions = MainStore.permissions[name];

      this.org = e;
      return response;
    });

    this.assets.budgetHistory = API.query('stats/budget', { name }).then(response => {
      this.budgetHistory = response.data.map(e => ({
        t: new Date(e.date),
        y: e.amount,
      }));

      return response;
    });

    this.assets.budget = API.query('organizations/budget/get', { name }).then(r => {
      this.budget = r;
      return r;
    });

    this.updateEmployees(name);
    this.updateGrades(name);
  };

  @action updateGrades = (role: string) => {
    this.assets.grades = API.query('roles/grades/get', { role })
      .then(r => {
        this.grades = r.data;
      })
      .catch(() => {
        /* do nothing */
      });
  };

  @action updateEmployees = (role: string) => {
    this.assets.employees = API.query('roles/get', { role })
      .then(r => {
        this.employees = r.data;
      })
      .catch(() => {
        /* do nothing */
      });
  };
}

const State = new StateProto();

export default State;
