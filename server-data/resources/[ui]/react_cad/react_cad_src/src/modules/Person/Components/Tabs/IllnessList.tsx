import React from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
// components
import MaterialTable from 'material-table';

function IllnessListProto({ State }): JSX.Element {
  const history = useHistory();

  const onRecordClick = (_, rowData) => {
    history.push(`/ambulance/record/${rowData.id}`);
  };

  return (
    <MaterialTable
      style={{ width: '100%' }}
      components={{
        Toolbar: () => null,
      }}
      columns={[
        {
          title: 'Дата',
          field: 'date',
          type: 'date',
        },
        {
          title: 'Причина обращения',
          field: 'title',
        },
        {
          title: 'Лечащий врач',
          field: 'responsible',
        },
      ]}
      data={State.IllnesList}
      isLoading={State.IllnesList === undefined}
      options={{
        draggable: false,
        padding: 'dense',
        pageSize: 16,
        pageSizeOptions: [16],
      }}
      onRowClick={onRecordClick}
    />
  );
}

export const IllnessList = observer(IllnessListProto);
export default observer(IllnessListProto);
