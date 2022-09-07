// core
import React from 'react';
import { observer } from 'mobx-react';
// components
import MaterialTable from 'material-table';
import { Box } from 'libs/UI';
// styles
import { MainStore } from 'storage/MainStore';
import s from './GasStations.module.scss';
// storage

const GasStations = () => (
  <div className={s.Content}>
    <Box className={s.HideInnerScrollbar}>
      <MaterialTable
        title="Заправочные станции"
        components={{
          Groupbar: () => '',
        }}
        columns={[
          { title: 'Бренд', field: 'brand', defaultGroupOrder: 0 },
          { title: 'Название', field: 'title' },
          { title: 'Владелец', field: 'owner' },
          { title: 'Цена', field: 'price' },
          { title: 'Объем', field: 'volume' },
        ]}
        options={{
          draggable: false,
          paging: false,
          grouping: true,
          padding: 'dense',
        }}
        data={MainStore.gasStations}
      />
    </Box>
  </div>
);

export default observer(GasStations);
