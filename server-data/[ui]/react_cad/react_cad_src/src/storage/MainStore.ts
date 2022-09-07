import { observable, makeAutoObservable } from 'mobx';
// types
import * as T from 'types';

interface PermissionOrg {
  manage?: {
    leader?: boolean;

    employees?: {
      edit: number | boolean;
    };

    grades?: {
      edit: number | boolean;
    };
  };

  certificates?: {
    edit?: boolean;
  };
}

interface PermissionOrgEMS {
  cases?: {
    edit?: {
      archive?: boolean;
    };
  };

  persons?: {
    edit?: boolean;
    remove?: boolean;
  };
}

interface PermissionOrgPolice extends PermissionOrg, PermissionOrgEMS {}

interface PermissionOrgAmbulance extends PermissionOrg, PermissionOrgEMS {}

type PermissionOrgOil = PermissionOrg;

type PermissionOrgGovernment = PermissionOrg;

interface Permissions {
  police?: PermissionOrgPolice;

  ambulance?: PermissionOrgAmbulance;

  oil?: PermissionOrgOil;

  government?: PermissionOrgGovernment;
}

class MainStoreProto {
  constructor() {
    makeAutoObservable(this);
  }

  @observable shown = false;

  @observable photoMode = false;

  @observable onPhotoHandler: { (url: string): void };

  @observable Homepage = '/';

  @observable snackbar = {
    open: false,
    text: '',
    category: 'info',
    actions: [],
  };

  @observable permissionSets = {
    ':Governor': {
      ambulance: {
        manage: {
          leader: true,
          employees: {
            edit: false,
          },
          grades: {
            edit: false,
          },
        },
      },

      police: {
        manage: {
          leader: true,
          employees: {
            edit: false,
          },
          grades: {
            edit: false,
          },
        },
      },

      oil: {
        manage: {
          leader: true,
          employees: {
            edit: false,
          },
          grades: {
            edit: false,
          },
        },
      },

      government: {
        certificates: {
          edit: true,
        },

        manage: {
          leader: true,
          employees: {
            edit: true,
          },

          grades: {
            edit: true,
          },
        },
      },
    },
    ':Ambulance Chief': {
      ambulance: {
        manage: {
          employees: {
            edit: true,
          },
          grades: {
            edit: true,
          },
        },

        cases: {
          edit: {
            archive: true,
          },
        },

        certificates: {
          edit: true,
        },

        persons: {
          edit: true,
          remove: true,
        },
      },
    },
    ':Police Chief': {
      police: {
        manage: {
          employees: {
            edit: true,
          },
          grades: {
            edit: true,
          },
        },

        cases: {
          edit: {
            archive: true,
          },
        },

        certificates: {
          edit: true,
        },

        persons: {
          edit: true,
          remove: true,
        },
      },
    },
    ':Officer': {
      police: {
        cases: {
          edit: {},
        },

        certificates: {
          edit: true,
        },

        persons: {
          edit: true,
        },
      },
    },
    ':Cadet': {
      police: {
        cases: {},

        certificates: {},

        persons: {},
      },
    },
  } as Record<string, Permissions>;

  @observable permissions = this.permissionSets[':Governor'];

  @observable gasStations: Array<T.GasStation> = [
    {
      brand: 'Xero',
      title: 'Заправка на Шоссе Сенора',
      owner: 'За Правка',
      volume: 10000,
      price: 15,
    },
    {
      brand: 'Xero',
      title: 'Заправка на Марина-драйв',
      owner: 'Бибина Буба',
      volume: 950,
      price: 15,
    },
    {
      brand: 'RON',
      title: 'Заправка на Cевере Бульвара Палето',
      owner: 'За Правка',
      volume: 10000,
      price: 15,
    },
    {
      brand: 'RON',
      title: 'Заправка на Западном Шоссе Дель-Перро',
      owner: 'Бибина Буба',
      volume: 950,
      price: 15,
    },
    {
      brand: 'Globe Oil',
      title: 'Заправка на Кале-авеню',
      owner: 'Не',
      volume: 10000,
      price: 15,
    },
    {
      brand: 'Globe Oil',
      title: 'Очка Заправ',
      owner: 'Бибина Буба',
      volume: 950,
      price: 15,
    },
    {
      brand: 'LTD',
      title: 'Заправ Очка',
      owner: 'За Правка',
      volume: 10000,
      price: 15,
    },
    {
      brand: 'LTD',
      title: 'Очка Заправ',
      owner: 'Бибина Буба',
      volume: 950,
      price: 15,
    },
  ];

  @observable tax = {};
}

export const MainStore = new MainStoreProto();

export default MainStore;
