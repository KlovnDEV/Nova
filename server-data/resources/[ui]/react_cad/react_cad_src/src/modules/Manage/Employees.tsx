import React from 'react';
import MaterialTable, { Column } from 'material-table';
import { observer } from 'mobx-react';
import { error, Icons, API } from 'utils';
import { Card, CardHeader } from 'components';
import * as T from 'types';
import State from './State';
import s from './Manage.module.scss';

const getEmployeesActions = org => {
  if (org.permissions?.manage?.employees?.edit)
    return [
      {
        text: 'Нанять',
        icon: Icons.ControlPoint,
        onClick: () => {
          API.query('cad/jobs/hire', { org: org.name });
        },
      },
    ];

  return [];
};

function getGradesLookup(grades: T.EmployeeGrade[]) {
  const res = { '-1': '* Уволить *' };
  // eslint-disable-next-line no-return-assign
  if (!grades) return res;

  grades.forEach(g => {
    res[g.grade] = g.label;
  });

  return res;
}

function Employees() {
  const managePermissions = State.org?.permissions?.manage;

  const onGradeChange = (
    newValue: string,
    _oldValue: string,
    rowData: { identifier: string },
    _columnDef: Column<AnyObject>,
  ): Promise<void> => {
    API.query('jobsChangeGrade', {
      identifier: rowData.identifier,
      role: State.org?.name,
      grade: parseInt(newValue, 10),
    })
      .then(() => {
        State.updateEmployees(State.org.name);
      })
      .catch(e => {
        console.log(e);
        error('Невозможно сменить должность!');
      });

    return new Promise<void>(r => r());
  };

  return (
    <Card
      header={<CardHeader labelText="Сотрудники" actions={getEmployeesActions(State.org)} />}
      className={s.MainCoworkers}
      flex="column top"
    >
      <MaterialTable
        components={{
          Toolbar: () => <div />,
        }}
        localization={{
          header: {
            actions: '',
          },
        }}
        columns={[
          { title: 'Сотрудник', field: 'name', editable: 'never' },
          {
            title: 'На смене',
            field: 'time',
            editable: 'never',
          },
          {
            title: 'Должность',
            field: 'grade',
            lookup: getGradesLookup(State.grades),
            editable: managePermissions?.employees?.edit ? 'always' : 'never',
          },
          {
            field: 'identifier',
            hidden: true,
          },
          {
            field: 'grade',
            hidden: true,
          },
        ]}
        isLoading={!State.grades}
        cellEditable={{
          onCellEditApproved: onGradeChange,
        }}
        data={State.employees || []}
        actions={
          managePermissions?.employees?.edit
            ? [
                {
                  icon: () => {
                    return <div style={{ width: 24 }}>{Icons.Prize}</div>;
                  },
                  tooltip: 'Премия',
                  onClick: (event, rowData) => console.log('FIXME', event, rowData),
                },
              ]
            : []
        }
        options={{
          draggable: false,
          actionsColumnIndex: -1,
          thirdSortClick: false,
          padding: 'dense',
          pageSize: 8,
          pageSizeOptions: [8],
          minBodyHeight: 326,
          maxBodyHeight: 326,
        }}
      />
    </Card>
  );
}

export default observer(Employees);
