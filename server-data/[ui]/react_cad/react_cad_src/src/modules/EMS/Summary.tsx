// core
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
// components
import MaterialTable from 'material-table';
import { Preloader, Card } from 'components';
// utils
// state
import State from './State';
// styles
import style from './Summary.module.scss';

const SummaryWanted = () => {
  const history = useHistory();
  return (
    <MaterialTable
      style={{ width: '100%' }}
      components={{
        Toolbar: () => <div />,
      }}
      columns={[
        {
          field: 'photo',
          title: 'Фото',
          render: rowData => (
            <img
              src={rowData.photo}
              style={{
                width: 80,
                borderRadius: '50%',
                height: 80,
                objectFit: 'cover',
              }}
              alt=""
            />
          ),
        },
        {
          title: 'Имя',
          field: 'name',
          render: (rowData: AnyObject) => (
            <p style={{ margin: 0 }}>{`${rowData.firstname} ${rowData.lastname}`}</p>
          ),
        },
        {
          title: 'Телефон',
          field: 'phone',
        },
        {
          title: 'Возраст',
          field: 'age',
        },
        {
          hidden: true,
          field: 'id',
        },
      ]}
      data={State.wanted || []}
      options={{
        draggable: false,
        padding: 'dense',
        pageSizeOptions: [5, 10],
      }}
      onRowClick={(_, rowData) => history.push(`/${State.orgName}/person/${rowData.id}`)}
    />
  );
};

const SummaryUnpaid = () => {
  return (
    <MaterialTable
      style={{ width: '100%' }}
      components={{
        Toolbar: () => <div />,
      }}
      columns={[
        {
          title: 'Имя',
          field: 'firstname',
          render: rowData => (
            <p style={{ margin: 0 }}>{`${rowData.firstname} ${rowData.lastname}`}</p>
          ),
        },
        {
          title: 'Телефон',
          field: 'phone',
        },
        {
          hidden: true,
          field: 'lastname',
        },
      ]}
      data={State.unpaid}
      options={{
        draggable: false,
        padding: 'dense',
        pageSizeOptions: [5, 10],
      }}
    />
  );
};

const Summary = observer(
  ({ orgName }: { orgName: string }): JSX.Element => {
    useEffect(() => {
      State.updateEMS(orgName);
    }, [orgName]);

    return (
      <div className={style.dashboard}>
        <div className={style.dashboardTables}>
          <Card header="В розыске" backgroundColor="#fff" flex="column top left">
            <Preloader event={State.assets.wanted} success={SummaryWanted} />
          </Card>
          <Card header="Неоплаченные штрафы" backgroundColor="#fff" flex="column top left">
            <Preloader event={State.assets.unpaid} success={SummaryUnpaid} />
          </Card>
        </div>
      </div>
    );
  },
);

export { Summary };
export default Summary;
