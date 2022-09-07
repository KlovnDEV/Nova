import { observable, makeAutoObservable, action } from 'mobx';
// types
import { API, error } from 'utils';
import * as T from 'types';

type Budget = {
  police?: number;
  ambulance?: number;
  oil?: number;
  government?: number;
};

class StateProto {
  constructor() {
    makeAutoObservable(this);
  }

  @observable assets = {} as {
    organizations: Promise<any>;
    budgetHistory: Promise<any>;
    budgets: Promise<any>;
  };

  getOrgIcon = (orgName: string): string => `${ASSETS}/img/logo/${orgName}.png`;

  @observable Organizations: T.Organizations | null = null;

  @observable Budget: Budget | null = null;

  @observable BudgetHistory: Record<string, T.BudgetHistoryEntry[]> | null = null;

  @observable BudgetHistoryChart: any = null;

  @observable oilCompanies: Array<any> = [
    {
      title: 'LTD Oil',
      price: 3.0,
    },
    {
      title: 'Globe Oil',
      price: 2.5,
    },
    {
      title: 'Xero Gas',
      price: 2.8,
    },
    {
      title: 'RON',
      price: 3.2,
    },
  ];

  // FIXME
  @observable tax: any;

  @action fetchBudgets = async (): Promise<any> => {
    return API.query('organizations/budget/get', {}).then(response => {
      this.Budget = {
        police: 12345,
        ambulance: 54321,
        oil: 23451,
        government: 345612,
      };

      return response;
    });
  };

  @action fetchBudgetHistory = (): Promise<any> => {
    return API.query('stats/budget', {}).then(response => {
      const data = {};

      response.data.forEach(e => {
        if (!data[e.identifier]) data[e.identifier] = [];

        data[e.identifier].push({
          t: new Date(e.date),
          y: e.amount,
        });
      });

      this.BudgetHistory = data;

      return response;
    });
  };

  @action updateOrganizations = () => {
    this.assets.organizations = this.fetchOrganizations();
    this.assets.budgets = this.fetchBudgets();
    this.assets.budgetHistory = this.fetchBudgetHistory();

    Promise.all([this.assets.organizations, this.assets.budgetHistory])
      .then(() => {
        this.createChart();
      })
      .catch(() => {});
  };

  @action fetchOrganizations = (): Promise<any> => {
    return API.query('organizations/get', {}).then(response => {
      const data = [...response.data];
      data.sort((a, b) => a.name - b.name);

      for (let i = 0; i < data.length; i += 1) {
        // FIXME
        const e = data[i];
        e.owner = 'ABC';
        e.income = 1000;
        e.taxPayFraction = 25;
      }

      this.Organizations = data;

      return response;
    });
  };

  getOrganization = (name: string): T.Organization => {
    return this.Organizations?.find(e => e.name === name);
  };

  createChart() {
    if (this.Organizations && this.BudgetHistory) {
      this.BudgetHistoryChart = this.Organizations.map(org => ({
        label: org.title,
        data: this.BudgetHistory[org.name] ? this.BudgetHistory[org.name] : [],
        fill: false,
        backgroundColor: org.color,
        borderColor: org.color,
      }));
    }

    return null;
  }
}

export default new StateProto();
