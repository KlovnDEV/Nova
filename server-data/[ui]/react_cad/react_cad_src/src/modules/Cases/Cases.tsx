import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
// components
import MaterialTable from 'material-table';
import { Preloader, Card } from 'components';
// utils
import { RecordCategoryAmbulance, RecordCategoryPolice } from 'types';
import { isNull } from 'underscore';
import State from './State';
// styles
import s from './Cases.module.scss';

type IProps = {
  archive: boolean;
  organization: string;
};

type KeyValuePair = {
  [x: number]: string;
};

const Lookup = (organization: string): KeyValuePair => {
  if (organization === 'ambulance')
    return {
      [RecordCategoryAmbulance.Reception]: 'Приём',
      [RecordCategoryAmbulance.Certificate]: 'Справка',
      [RecordCategoryAmbulance.Surgery]: 'Операция',
    };

  if (organization === 'police')
    return {
      [RecordCategoryPolice.Administrative]: 'Административное',
      [RecordCategoryPolice.Criminal]: 'Уголовное',
    };

  return {};
};

const CasesBody = ({ title, organization }: { title: string; organization: string }) => {
  const history = useHistory();
  return (
    <MaterialTable
      style={{ width: '100%' }}
      title={title}
      columns={[
        { field: 'id', hidden: true, type: 'numeric' },
        { title: 'Название', field: 'title' },
        {
          title: 'Категория',
          field: 'category',
          type: 'numeric',
          align: 'left',
          lookup: Lookup(organization),
        },
        { title: 'Ответственный', field: 'responsible' },
        { title: 'Дата', field: 'date', type: 'date' },
      ]}
      data={State.Cases}
      options={{
        draggable: false,
        pageSize: 18,
        pageSizeOptions: [18],
        thirdSortClick: false,
        padding: 'dense',
      }}
      onRowClick={(_, rowData) => history.push(`/${organization}/record/${rowData.id}`)}
    />
  );
};

const CasesProto = ({ archive, organization }: IProps) => {
  const history = useHistory();

  useEffect(() => {
    State.updateCases(archive, organization);
  }, [archive, organization]);

  const Title = (): string => {
    if (archive) return 'Архив';
    if (!archive && organization === 'ambulance') return 'Текущие дела';
    if (!archive && organization === 'police') return 'Список дел';
    return '';
  };

  return (
    <div className={s.Wrapper}>
      <Card header={Title()} flex="column top left">
        <Preloader
          event={State.assets.cases}
          success={CasesBody}
          title={Title()}
          organization={organization}
        />
      </Card>
    </div>
  );
};

export const Cases = observer(CasesProto);
export default observer(CasesProto);
