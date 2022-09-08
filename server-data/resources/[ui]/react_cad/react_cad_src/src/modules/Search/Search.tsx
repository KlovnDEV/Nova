import React from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
// components
import MaterialTable, { MTableBody } from 'material-table';
import { Card } from 'components';
import { TextField, Box } from 'libs/UI';
// utils
import { useStatusLabels, getPersonSex, Icons } from 'utils';
import { MainStore } from 'storage/MainStore';
import State from './State';
// styles
import s from './Search.module.scss';

const Search = observer(props => {
  const history = useHistory();
  const { orgName } = props;

  const status = useStatusLabels(orgName);

  const orgPermissions = MainStore.permissions[orgName] || {};

  return (
    <div className={s.Wrapper}>
      <Card header="Поиск" flex="column top left">
        <div className={s.SearchBox}>
          <TextField
            variant="outlined"
            id="name"
            fullWidth
            label="Имя"
            value={State.firstname}
            onChange={e => {
              State.firstname = e.target.value;
            }}
          />
          <TextField
            variant="outlined"
            id="lastname"
            fullWidth
            label="Фамилия"
            value={State.lastname}
            onChange={e => {
              State.lastname = e.target.value;
            }}
          />
          <TextField
            variant="outlined"
            id="phone"
            fullWidth
            label="Номер телефона"
            value={State.phone}
            onChange={e => {
              State.phone = e.target.value;
            }}
          />
          <button className={s.SearchButton} type="button" onClick={() => State.onSearch(orgName)}>
            Поиск
          </button>
        </div>
      </Card>
      <Card header="Результаты поиска" flex="column top left">
        <MaterialTable
          style={{ width: '100%' }}
          components={{
            Toolbar: () => <span />,
            Body: p => {
              if (State?.Persons?.length > 0 || !orgPermissions?.persons?.edit)
                return <MTableBody {...p} />;

              return (
                <tbody>
                  <tr>
                    <td colSpan={100}>
                      <Box flex="center" className={s.NewWrapper}>
                        <button
                          type="button"
                          onClick={() => history.push(`/${orgName}/person/-1`)}
                          className={s.NewButton}
                        >
                          {Icons.ControlPoint}
                          <span>Добавить личное дело</span>
                        </button>
                      </Box>
                    </td>
                  </tr>
                </tbody>
              );
            },
          }}
          columns={[
            { title: 'Person ID', field: 'id', hidden: true },
            { title: 'Имя', field: 'firstname' },
            { title: 'Фамилия', field: 'lastname' },
            {
              title: 'Пол',
              field: 'sex',
              lookup: getPersonSex().reduce((dict, item) => {
                // eslint-disable-next-line no-param-reassign
                dict[item.value] = item.label;

                return dict;
              }, {}),
            },
            { title: 'Возраст', field: 'age' },
            { title: 'Номер телефона', field: 'phone' },
            {
              title: 'Статус',
              field: 'status',
              lookup: status,
            },
          ]}
          data={State.Persons || []}
          options={{
            draggable: false,
            pageSize: 10,
            pageSizeOptions: [10],
            thirdSortClick: false,
            padding: 'dense',
          }}
          onRowClick={(_, rowData) => history.push(`/${orgName}/person/${rowData.id}`)}
        />
      </Card>
    </div>
  );
});

// eslint-disable-next-line import/prefer-default-export
export default Search;
