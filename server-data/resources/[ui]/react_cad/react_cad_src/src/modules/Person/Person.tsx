import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
// components
import { Tabs, Card, CardHeader, Preloader } from 'components';
import { TextField, Box, Select } from 'libs/UI';
import { PhotoControls } from 'modules/Photo/Components';
import { Icons, getPersonSex, success } from 'utils';
import { useStatusLabels } from 'utils/useStatusLabels';
import { MainStore } from 'storage/MainStore';
import { Cases, Violations, Certificates, IllnessList } from './Components';
// utils
import State from './State';
// styles
import s from './Person.module.scss';

type IProps = {
  id: number;
  orgName: 'police' | 'ambulance';
  editable?: boolean;
};

const PersonControls = observer(({ orgName, editable }: { orgName: string; editable: boolean }) => {
  const [isPhotoAddOpen, setPhotoAddOpen] = useState(false);
  const statusLabels = useStatusLabels(orgName, true);

  const asDataField = (fieldname: string, readOnly?: boolean) => {
    if (readOnly) {
      return {
        value: State.Person[fieldname],
        onChange: () => {
          /* do nothing */
        },
        readOnly: true,
      };
    }

    return {
      value: State.Person[fieldname],
      onChange: e => {
        State.Person[fieldname] = e.target.value;
      },
    };
  };

  const onMediaAddHandler = (src: string): void => {
    State.Person.photo = src;
    setPhotoAddOpen(false);
  };

  return (
    <div className={s.PersonData}>
      <div className={s.PersonAvatar}>
        {!isPhotoAddOpen && (
          <button
            type="button"
            onClick={() => setPhotoAddOpen(true)}
            className={s.PersonAvatarAction}
          >
            Добавить
          </button>
        )}
        {isPhotoAddOpen ? (
          <PhotoControls onMediaAdd={onMediaAddHandler} />
        ) : (
          <img className={s.PersonAvatarImage} src={State.Person.photo} alt="" />
        )}
      </div>
      <TextField
        variant="outlined"
        id="firstname"
        label="Имя"
        fullWidth
        {...asDataField('firstname', !editable)}
      />
      <TextField
        variant="outlined"
        id="lastname"
        label="Фамилия"
        fullWidth
        {...asDataField('lastname', !editable)}
      />
      <div className={s.PersonRow}>
        <Select
          readOnly={!editable}
          name="category"
          id="cat"
          options={getPersonSex()}
          {...asDataField('sex', !editable)}
        />
        <TextField
          variant="outlined"
          id="age"
          label="Возраст"
          fullWidth
          {...asDataField('age', !editable)}
        />
      </div>
      <Select
        readOnly={!editable}
        name="status"
        id="cat"
        options={statusLabels}
        {...asDataField('status', !editable)}
      />
      <TextField
        variant="outlined"
        id="phone"
        label="Телефон"
        fullWidth
        {...asDataField('phone', !editable)}
      />
    </div>
  );
});

const Person = observer(({ id, orgName }: IProps) => {
  const history = useHistory();

  const orgPermissions = MainStore.permissions[orgName];
  const editable = orgPermissions?.persons?.edit;

  const getPersonActions = () => {
    if (!editable) return [];

    const res = [
      {
        text: 'Сохранить',
        icon: Icons.Save,
        onClick: () => State.savePerson(id, history),
      },
    ];

    if (orgPermissions?.persons?.remove) {
      res.push({
        text: 'Удалить',
        icon: Icons.RemoveCircleOutline,
        onClick: () => {
          return State.deletePerson(id.toString()).then(async () => {
            success('Успешно удалено!');
            await history.replace(`/${orgName}/search`);
            return true;
          });
        },
      });
    }

    return res;
  };

  useEffect(() => {
    State.updatePerson(orgName, id);
  }, [id, orgName]);

  return (
    <div style={{ padding: '10px 0' }}>
      <Card header={<CardHeader labelText="Персоналия" actions={getPersonActions()} />}>
        <div className={s.PersonGrid}>
          {id >= 0 && (
            <div className={s.PersonTables}>
              <Tabs
                defaultPage={orgName === 'ambulance' ? 'История болезни' : 'Упоминания в делах'}
              >
                {orgName === 'ambulance' && <IllnessList key="История болезни" State={State} />}
                {orgName === 'police' && (
                  <Cases key="Упоминания в делах" State={State} orgName={orgName} />
                )}
                {orgName === 'police' && <Violations key="Правонарушения" State={State} />}
                <Certificates key="Справки" State={State} orgName={orgName} />
              </Tabs>
            </div>
          )}
          <Box elevation={2}>
            <Preloader
              event={State.assets.person}
              success={PersonControls}
              orgName={orgName}
              editable={editable}
            />
          </Box>
        </div>
      </Card>
    </div>
  );
});

export { Person };
export default Person;
