/* eslint-disable react/display-name */
import React, { useState } from 'react';
// components
import MaterialTable from 'material-table';
import { Icons } from 'utils';
import { TextField, Select } from 'libs/UI';
// types
import * as T from 'types';
// styles
import s from '../../Record.module.scss';

type IProps = {
  participants: Array<T.RecordParticipant>;
  participantsRoles: Array<AnyObject>;
  editable: boolean;
  isParticipantsMenuOpen: boolean;
  onParticipantAdd: {
    (firstname: string, lastname: string, role: T.RecordParticipantCategoryPolice);
  };
  onParticipantRemove: { (rowData: AnyObject): void };
};

const RecordPersons = ({
  participants,
  participantsRoles,
  editable,
  isParticipantsMenuOpen,
  onParticipantAdd,
  onParticipantRemove,
}: IProps): JSX.Element => {
  const [role, setRole] = useState(-1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <>
      {!isParticipantsMenuOpen && (
        <MaterialTable
          style={{ width: '100%' }}
          components={{
            Toolbar: () => <div />,
          }}
          columns={[
            {
              title: 'Имя',
              field: 'name',
              render: rowData => (
                <p style={{ margin: 0 }}>{`${rowData.firstname} ${rowData.lastname}`}</p>
              ),
            },
            {
              title: 'Роль',
              field: 'category',
              lookup: participantsRoles.reduce((dict, item) => {
                // eslint-disable-next-line no-param-reassign
                dict[item.value] = item.label;

                return dict;
              }, {}),
            },
          ]}
          localization={{
            header: {
              actions: '',
            },
          }}
          options={{
            draggable: false,
            paging: false,
            actionsColumnIndex: -1,
            padding: 'dense',
          }}
          data={participants}
          actions={
            editable
              ? [
                  {
                    icon: () => Icons.HighlightOff,
                    tooltip: 'Удалить',
                    onClick: (_, rowData) => onParticipantRemove(rowData),
                  },
                ]
              : []
          }
        />
      )}
      {isParticipantsMenuOpen && (
        <div className={s.ParticipantMenu}>
          <TextField
            variant="outlined"
            fullWidth
            label="Имя"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <TextField
            variant="outlined"
            fullWidth
            label="Фамилия"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <Select
            name="category"
            options={participantsRoles}
            value={role}
            onChange={e => {
              setRole(e.target.value);
            }}
            style={{ gridColumn: '1/-1' }}
          />
          <button
            className={s.MediaMenuAdd}
            type="button"
            style={{ margin: 0, gridColumn: '1/-1' }}
            onClick={() => {
              onParticipantAdd(firstName, lastName, role);
              setFirstName('');
              setLastName('');
              setRole(-1);
            }}
          >
            Добавить
          </button>
        </div>
      )}
    </>
  );
};

export default RecordPersons;
