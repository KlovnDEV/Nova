import React from 'react';
import MaterialTable, { Column } from 'material-table';
import { observer } from 'mobx-react';
import * as T from 'types';
import { Card } from 'components';
import State from './State';
import s from './Manage.module.scss';

function SalaryTable(props: {
  edit: boolean;
  onSalaryChange: {
    (grade: number, salary: number): Promise<void>;
  };
}) {
  const { onSalaryChange } = props;
  const managePermissions = State.org?.permissions.manage || {};

  if (!managePermissions.grades) return null;

  return (
    <Card header="Должности" className={s.MainPosition} flex="column top">
      <MaterialTable
        style={{ width: '100%' }}
        //   tableRef={ref}
        components={{
          Toolbar: () => <div />,
          Pagination: () => <td />,
        }}
        localization={{
          header: {
            actions: '',
          },
        }}
        columns={[
          {
            title: 'Должность',
            field: 'label',
            editable: 'never',
          },
          {
            title: 'Зарплата',
            field: 'salary',
            editable: managePermissions.grades?.edit ? 'always' : 'never',
          },
        ]}
        cellEditable={{
          onCellEditApproved: async (
            newValue: string,
            _oldValue: string,
            rowData: { id: number; grade: number },
            _columnDef: Column<AnyObject>,
          ) => {
            onSalaryChange(rowData.grade, parseInt(newValue, 10));
          },
        }}
        data={State.grades || []}
        isLoading={!State.grades}
        options={{
          draggable: false,
          thirdSortClick: false,
          pageSize: State.grades?.length || 1,
          pageSizeOptions: [State.grades?.length || 1],
          padding: 'dense',
        }}
      />
    </Card>
  );
}

export default observer(SalaryTable);
