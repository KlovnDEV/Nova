/* eslint-disable import/prefer-default-export */
import React from 'react';
import { observer } from 'mobx-react';
// components
import { TextField, Select } from 'libs/UI';
import { Card } from 'components';
// utils
import { zeroPad, generateAsDataField, getSelectCategories } from 'utils';
import * as T from 'types';
// styles
import s from '../../Record.module.scss';

type IProps = { record: T.Record; editable: boolean; organization: string };

export const TabMain = observer(
  ({ record, editable, organization }: IProps): JSX.Element => {
    if (!record) return null;

    const asDataField = generateAsDataField(record, (fieldname, value) => {
      if (fieldname === 'id') {
        if (value < 0) return '';
        return zeroPad(value, 8);
      }

      return value;
    });

    const selectCategories = getSelectCategories(organization);

    return (
      <div className={s.Grid}>
        <Card flex="column top left">
          <div className={s.RecordRow}>
            <TextField
              variant="outlined"
              fullWidth
              label="№ дела (заполняется системой)"
              readOnly
              {...asDataField('id', true)}
            />
            <TextField
              variant="outlined"
              fullWidth
              label="Наименование"
              {...asDataField('title', !editable)}
            />
          </div>
          <div className={s.RecordRow}>
            <Select
              name="category"
              options={selectCategories}
              label="Выберите категорию"
              fullWidth
              {...asDataField('category', !editable)}
            />
          </div>
          <div className={s.RecordRow}>
            <TextField
              variant="outlined"
              fullWidth
              label={organization === 'police' ? 'Расследует' : 'Ответственный'}
              {...asDataField('responsible', !editable)}
            />
            <label className={s.Checkbox} htmlFor="check">
              <input
                type="checkbox"
                name="check"
                checked={record.isArchived}
                onChange={e => {
                  // eslint-disable-next-line no-param-reassign
                  record.isArchived = e.target.checked;
                }}
              />
              Архив
            </label>
          </div>
        </Card>
        <Card header="Описание дела">
          <textarea rows={16} className={s.Textarea} {...asDataField('description', !editable)} />
        </Card>
      </div>
    );
  },
);
