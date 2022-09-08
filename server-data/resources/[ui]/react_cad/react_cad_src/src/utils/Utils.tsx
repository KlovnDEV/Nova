import React, { ChangeEvent, useState } from 'react';
import * as T from 'types';
// storage
import { MainStore } from 'storage/MainStore';

export const {
  PersonStatus: { Dead, Alive, Wanted, UnderInvestigation, Prison, Missing },
  PersonSex,
} = T;

export function ConcatClasses(...args: Array<string | boolean>): string {
  const res = [];

  args.forEach(arg => {
    if (arg === undefined) throw new Error(`ClassName not defined! ${JSON.stringify(args)}`);
    if (arg !== '' && arg !== false) {
      res.push(arg);
    }
  });

  return res.join(' ');
}

export function minmax(x: number, min: number, max: number): number {
  return Math.max(Math.min(x, max), min);
}

export function formatMoney(value: number): JSX.Element {
  return <>${value.toLocaleString('ru-RU')}</>;
}

export function getPersonStatusLables(
  orgName?: string,
  current?: T.PersonStatus,
): Array<{ label: string; value: T.PersonStatus }> {
  if (orgName === 'ambulance')
    return [
      {
        label: 'Жив(а)',
        value: current !== Dead && current !== Alive ? current : Alive,
      },
      {
        label: 'Мертв(а)',
        value: Dead,
      },
    ];

  return [
    {
      label: 'Жив(а)',
      value: Alive,
    },
    {
      label: 'Мертв(а)',
      value: Dead,
    },
    {
      label: 'В розыске',
      value: Wanted,
    },
    {
      label: 'Пропавший(ая) без вести',
      value: Missing,
    },
    {
      label: 'Под следствием',
      value: UnderInvestigation,
    },
    {
      label: 'В тюрьме',
      value: Prison,
    },
  ];
}

export function getPersonSex(): Array<{ label: string; value: T.PersonSex }> {
  return [
    {
      label: 'М',
      value: PersonSex.Male,
    },
    {
      label: 'Ж',
      value: PersonSex.Female,
    },
  ];
}

export const zeroPad = (num: number, places: number): string => String(num).padStart(places, '0');

export type InterceptorValueType = any;

export type InterceptorFunction = {
  (fieldname: string, value: InterceptorValueType): InterceptorValueType;
};

export const generateAsDataField = (
  baseObject: AnyObject,
  interceptor?: InterceptorFunction,
): { (fieldname: string, readonly?: boolean): InterceptorValueType } => {
  // eslint-disable-next-line no-param-reassign
  if (!interceptor) interceptor = (_, value) => value;

  return (fieldname: string, readonly?: boolean) => {
    const value = interceptor(fieldname, baseObject[fieldname]);
    const res = { value } as InterceptorValueType;
    if (readonly) {
      res.readOnly = true;
    } else {
      res.onChange = (e: ChangeEvent<HTMLInputElement>) => {
        // eslint-disable-next-line no-param-reassign
        baseObject[fieldname] = e.target.value;
      };
    }
    return res;
  };
};

export function error(text: string, timeout = 3000, actions?: Array<T.SnackbarAction>): void {
  MainStore.snackbar = {
    open: true,
    text,
    category: 'error',
    actions,
  };

  setTimeout(() => {
    MainStore.snackbar.open = false;
  }, timeout);
}

export function warn(text: string, timeout = 3000, actions?: Array<T.SnackbarAction>): void {
  MainStore.snackbar = {
    open: true,
    text,
    category: 'warn',
    actions,
  };

  setTimeout(() => {
    MainStore.snackbar.open = false;
  }, timeout);
}

export function info(text: string, timeout = 3000, actions?: Array<T.SnackbarAction>): void {
  MainStore.snackbar = {
    open: true,
    text,
    category: 'info',
    actions,
  };

  setTimeout(() => {
    MainStore.snackbar.open = false;
  }, timeout);
}

export function success(text: string, timeout = 3000, actions?: Array<T.SnackbarAction>): void {
  MainStore.snackbar = {
    open: true,
    text,
    category: 'success',
    actions,
  };

  setTimeout(() => {
    MainStore.snackbar.open = false;
  }, timeout);
}

export function genRandomHistory(startBudget: number, diff: number): Array<T.BudgetHistoryEntry> {
  const res = [];
  let budget = startBudget;
  const tickDate = new Date('2020-12-28');

  for (let i = 1; i < 90; i += 1) {
    budget = budget + Math.ceil(Math.random() * diff) - Math.ceil(Math.random() * diff);
    tickDate.setDate(tickDate.getDate() - 1);
    res.push({
      t: new Date(tickDate),
      y: budget,
    });
  }

  return res;
}

export const getParticipantsRoles = (organization: string): Array<AnyObject> => {
  if (organization === 'police')
    return [
      {
        label: 'Выберите роль фигуранта',
        value: -1,
        hidden: true,
      },
      {
        label: 'Жертва',
        value: T.RecordParticipantCategoryPolice.Victim,
      },
      {
        label: 'Свидетель',
        value: T.RecordParticipantCategoryPolice.Witness,
      },
      {
        label: 'Подозреваемый',
        value: T.RecordParticipantCategoryPolice.Criminal,
      },
      {
        label: 'Офицер',
        value: T.RecordParticipantCategoryPolice.Officer,
      },
      {
        label: 'Детектив',
        value: T.RecordParticipantCategoryPolice.Detective,
      },
    ];

  if (organization === 'ambulance')
    return [
      {
        label: 'Выберите роль участника',
        value: -1,
        hidden: true,
      },
      {
        label: 'Пациент',
        value: T.RecordParticipantCategoryAmbulance.Patient,
      },
      {
        label: 'Ассистент',
        value: T.RecordParticipantCategoryAmbulance.Assistant,
      },
      {
        label: 'Доктор',
        value: T.RecordParticipantCategoryAmbulance.Doctor,
      },
    ];

  return [];
};

export const getSelectCategories = (organization: string): Array<AnyObject> => {
  if (organization === 'police') {
    return [
      {
        label: 'Выберите категорию',
        value: -1,
        hidden: true,
      },
      {
        label: 'Административное',
        value: T.RecordCategoryPolice.Administrative,
      },
      {
        label: 'Уголовное',
        value: T.RecordCategoryPolice.Criminal,
      },
    ];
  }

  if (organization === 'ambulance') {
    return [
      {
        label: 'Выберите категорию',
        value: -1,
        hidden: true,
      },
      {
        label: 'Приём',
        value: T.RecordCategoryAmbulance.Reception,
      },
      {
        label: 'Справка',
        value: T.RecordCategoryAmbulance.Certificate,
      },
      {
        label: 'Операция',
        value: T.RecordCategoryAmbulance.Surgery,
      },
    ];
  }

  return [];
};

export function wrapInAPIResponse(value: any, status = 200): Promise<any> {
  return new Promise(p => p({ status, data: value }));
}

export function sleep(ms: number): Promise<T.APIResponse> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export const useForceUpdate = () => {
  const [state, setState] = useState(false);
  return () => setState(!state);
};
