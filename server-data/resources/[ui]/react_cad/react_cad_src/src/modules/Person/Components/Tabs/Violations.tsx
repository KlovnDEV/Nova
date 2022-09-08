import React from 'react';
import { observer } from 'mobx-react';
// components
import MaterialTable from 'material-table';

function ViolationsProto({ State }): JSX.Element {
  return (
    <MaterialTable
      style={{ width: '100%' }}
      title="Правонарушения"
      components={{
        Toolbar: () => null,
      }}
      columns={[
        {
          title: 'Индекс',
          field: 'id',
          hidden: true,
        },
        {
          title: 'Статья',
          field: 'label',
        },
        {
          title: 'Размер взыскания',
          field: 'fineAmount',
        },
        {
          title: 'Срок',
          field: 'detentionAmount',
        },
        {
          title: 'Дата',
          field: 'date',
          type: 'date',
        },
        {
          title: 'Закрыто',
          field: 'closed',
          lookup: {
            0: 'Нет',
            1: 'Да',
          },
        },
      ]}
      actions={[
        {
          icon: 'close',
          tooltip: 'Закрыть',
          onClick: (event, rowData) => State.violationCloseHandler(event, rowData),
        },
      ]}
      data={State.Violations}
      isLoading={!State.Violations}
      options={{
        draggable: false,
        padding: 'dense',
        actionsColumnIndex: -1,
        pageSize: 16,
        pageSizeOptions: [16],
      }}
    />
  );
}

export const Violations = observer(ViolationsProto);
export default observer(ViolationsProto);
