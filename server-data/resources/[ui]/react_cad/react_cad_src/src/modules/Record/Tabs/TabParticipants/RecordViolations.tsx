/* eslint-disable react/display-name */
import React, { useState } from 'react';
// components
import MaterialTable from 'material-table';
import { Icons } from 'utils';
import { TextField, Select, Range } from 'libs/UI';
// styles
import * as T from 'types';
import s from '../../Record.module.scss';
// types

type IProps = {
  lawArticles: Array<T.LawArticle>;
  violations: Array<T.Violation>;
  editable: boolean;
  isViolationsMenuOpen: boolean;
  onViolationAdd: {
    (
      firstname: string,
      lastname: string,
      lawId: number,
      fineAmount: number,
      detentionAmount: number,
    );
  };
  onViolationRemove: { (rowData: AnyObject): void };
};

const RecordViolations = ({
  lawArticles,
  violations,
  editable,
  isViolationsMenuOpen,
  onViolationAdd,
  onViolationRemove,
}: IProps): JSX.Element => {
  const [lawId, setLawId] = useState(-1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fineAmount, setFineAmount] = useState(0);
  const [detentionAmount, setDetentionAmount] = useState(0);

  const updateLaw = () => {
    const law = lawArticles?.find(elem => elem.id === lawId);
    if (!law) return null;

    if (fineAmount < law.fineMin) setFineAmount(law.fineMin);
    if (fineAmount > law.fineMax) setFineAmount(law.fineMax);

    if (detentionAmount < law.detentionMin) setDetentionAmount(law.detentionMin);
    if (detentionAmount > law.detentionMax) setDetentionAmount(law.detentionMax);

    return law;
  };

  const currentLaw = updateLaw();

  return (
    <>
      {!isViolationsMenuOpen && (
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
              title: 'Статья',
              field: 'lawId',
            },
            {
              title: 'Штраф',
              field: 'fineAmount',
            },
            {
              title: 'Заключение',
              field: 'detentionAmount',
            },
            {
              title: 'Погашено',
              field: 'closed',
              lookup: { 0: 'нет', 1: 'да', false: 'нет', true: 'да' },
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
          data={violations}
          actions={
            editable
              ? [
                  {
                    icon: () => Icons.HighlightOff,
                    tooltip: 'Удалить',
                    onClick: (_, rowData) => onViolationRemove(rowData),
                  },
                ]
              : []
          }
        />
      )}
      {isViolationsMenuOpen && (
        <div className={s.ParticipantMenu}>
          <TextField
            variant="outlined"
            fullWidth
            label="Имя"
            value={firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
          />
          <TextField
            variant="outlined"
            fullWidth
            label="Фамилия"
            value={lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
          />
          <Select
            name="category"
            options={[
              {
                value: -1,
                label: 'Выберите статью закона',
                hidden: true,
              },
              ...lawArticles.map(item => {
                return { value: item.id, label: item.description };
              }),
            ]}
            value={lawId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              setLawId(+e.target.value);
              updateLaw();
            }}
            style={{ gridColumn: '1/-1' }}
          />
          {currentLaw && (
            <>
              <div>
                <span>Штраф ${fineAmount}</span>
                <Range
                  min={currentLaw.fineMin}
                  max={currentLaw.fineMax}
                  value={fineAmount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFineAmount(+e.target.value)
                  }
                />
              </div>
              <div>
                <span>Заключение {detentionAmount}с</span>
                <Range
                  min={currentLaw.detentionMin}
                  max={currentLaw.detentionMax}
                  value={detentionAmount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setDetentionAmount(+e.target.value)
                  }
                />
              </div>
            </>
          )}
          <button
            className={s.MediaMenuAdd}
            type="button"
            style={{ margin: 0, gridColumn: '1/-1' }}
            onClick={(): void => {
              if (onViolationAdd(firstName, lastName, lawId, fineAmount, detentionAmount)) {
                setFirstName('');
                setLastName('');
                setLawId(-1);
              }
            }}
          >
            Добавить
          </button>
        </div>
      )}
    </>
  );
};

export default RecordViolations;
