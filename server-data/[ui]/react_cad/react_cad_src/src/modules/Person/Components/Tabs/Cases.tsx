import React from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
// components
import MaterialTable from 'material-table';

function CasesProto({ State, orgName }): JSX.Element {
  const history = useHistory();

  const onCaseClick = (_, rowData) => {
    history.push(`/${orgName}/record/${rowData.id}`);
  };

  return (
    <MaterialTable
      style={{ width: '100%' }}
      components={{
        Toolbar: () => null,
      }}
      columns={[
        {
          title: 'Статус',
          field: 'isArchived',
          lookup: {
            0: 'Открыто',
            1: 'Закрыто',
          },
        },
        {
          title: '№ дела',
          field: 'idPadded',
        },
        {
          title: 'Категория',
          field: 'category',
          lookup: {
            0: 'Административное',
            1: 'Уголовное',
          },
        },
        {
          title: 'Дата',
          field: 'date',
          type: 'date',
        },
      ]}
      data={State.Cases}
      isLoading={!State.Cases}
      options={{
        draggable: false,
        padding: 'dense',
        pageSize: 16,
        pageSizeOptions: [16],
      }}
      onRowClick={onCaseClick}
    />
  );
}

export const Cases = observer(CasesProto);
export default observer(CasesProto);
