import React from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
// components
import MaterialTable from 'material-table';
import * as T from 'types';

function CertificatesProto({ State, orgName }): JSX.Element {
  const history = useHistory();

  const onCaseClick = (_, rowData) => {
    history.push(`/${orgName}/certificate/${rowData.id}`);
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
          field: 'isRevoked',
          lookup: {
            0: 'Действует',
            1: 'Недействительна',
          },
        },
        {
          title: '№ справки',
          field: 'id',
        },
        {
          title: 'Категория',
          field: 'category',
          lookup: {
            [T.CertificateCategory.IDCard]: 'Идентификационная карта',
            [T.CertificateCategory.Document]: 'Документ',
            [T.CertificateCategory.Fine]: 'Штраф',
            [T.CertificateCategory.PassKey]: 'Ключ доступа',
          },
        },
        {
          title: 'Дата выдачи',
          field: 'date',
          type: 'date',
        },
        {
          title: 'Действительно до',
          field: 'expireDate',
          type: 'date',
        },
        {
          title: 'Выдал',
          field: 'author',
        },
      ]}
      data={State.Certificates}
      isLoading={!State.Certificates}
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

export const Certificates = observer(CertificatesProto);
export default observer(CertificatesProto);
