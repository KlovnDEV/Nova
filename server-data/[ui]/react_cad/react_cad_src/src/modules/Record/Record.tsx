import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
// components
import { Preloader, Card, Tabs, CardHeader } from 'components';
import { error, Icons, success } from 'utils';
import { MainStore } from 'storage/MainStore';
import { TabMain, TabMaterials, TabParticipants } from './Tabs';
// styles
import s from './Record.module.scss';
// utils
import State from './State';

const PageCardHeader = (props): JSX.Element => {
  const { id, editable, action } = props;

  const editableActions = {
    text: 'Сохранить',
    icon: Icons.Save,
    onClick: action,
  };

  return (
    <CardHeader
      labelText={id === '-1' ? 'Новое дело' : `Дело №${id}`}
      actions={editable ? [editableActions] : []}
    />
  );
};

type IProps = {
  id: number;
  organization: 'police' | 'ambulance';
};

const RecordBody = ({ recordId, organization }: { recordId: number; organization: string }) => {
  const orgPermissions = MainStore.permissions[organization];
  const history = useHistory();

  const editable =
    orgPermissions?.cases?.edit?.archive ||
    (orgPermissions?.cases?.edit && !State.hasRecordArchived);

  const save = () => {
    State.saveRecord()
      .then(async r => {
        if (r.data.insertId !== 0) {
          await history.replace(`/${organization}/record/${r.data.insertId}`);
          success('Успешно сохранено!');
        } else {
          success(`Успешно обновлено дело №${recordId}!`);
        }
      })
      .catch(e => {
        error(`Ошибка сохранения! ${e}`);
      });
  };

  return (
    <Card
      flex="column top left"
      elevation={0}
      header={<PageCardHeader id={recordId} editable={editable} action={save} />}
    >
      <Tabs>
        <TabMain
          key="Основная информация"
          record={State.RecordData}
          editable={editable}
          organization={organization}
        />
        <TabParticipants
          key={organization === 'police' ? 'Фигуранты' : 'Участники'}
          editable={editable}
          organization={organization}
        />
        {organization === 'police' && <TabMaterials key="Материалы" editable={editable} />}
      </Tabs>
    </Card>
  );
};

const Record = observer(({ id, organization }: IProps) => {
  useEffect(() => {
    State.setOrganization(organization);
    State.updateRecordData(id);
    State.updateLawArticles();
  }, [id, organization]);

  return (
    <div className={s.Wrapper}>
      <Preloader
        event={State.assets.recordData}
        success={RecordBody}
        recordId={id}
        organization={organization}
      />
    </div>
  );
});

export default Record;
