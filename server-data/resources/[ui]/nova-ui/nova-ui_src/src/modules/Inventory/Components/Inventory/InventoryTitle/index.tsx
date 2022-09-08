// core
import React from 'react';
// components
import { WeightIndicator } from '~m/Inventory/Components/Inventory/WeightIndicator';
// style
import s from './index.local.scss';

type IProps = {
  weight: number;
  maxWeight: number;
  title: string;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
};

const InventoryTitle = ({ weight, maxWeight, title, onClose }: IProps): JSX.Element => (
  <div className={s.TitleWrapper}>
    <p className={s.Title}>{title}</p>
    {onClose && (
      <button type="button" className={s.Close} onClick={onClose}>
        &times;
      </button>
    )}

    <WeightIndicator value={weight} maxValue={maxWeight} />
  </div>
);
export { InventoryTitle };
export default InventoryTitle;
