import React, { Dispatch, SetStateAction, useState } from 'react';
import { observer } from 'mobx-react';
import { ShopItem } from 'modules/Shop/Components/ShopItem';
// store
import ShopStore from 'modules/Shop/Storage';
// styles
import { Button, InputField } from 'libs/UI';
import s from './index.local.scss';

type SortField = 'displayName' | 'price' | 'quantity';
type SortDirection = 'asc' | 'desc';

type IControls = {
  sort: string;
  setSortDir: Dispatch<SetStateAction<SortDirection>>;
  setSort: Dispatch<SetStateAction<SortField>>;
};

const Controls = ({ sort, setSortDir, setSort }: IControls) => {
  const searchItem = (e: React.ChangeEvent<HTMLInputElement>): void => {
    ShopStore.setSearch(e.target.value);
  };

  const sortChanger = (field: SortField) => {
    if (field === sort) {
      setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortDir('asc');
    }
    setSort(field);
  };

  return (
    <div className={s.ShopControls}>
      <InputField type="text" name="search" placeholder="Поиск" onChange={searchItem} />
      <div className={s.ShopFilter}>
        <p>Фильтр:</p>
        <Button
          onClick={() => sortChanger('displayName')}
          active={sort === 'displayName'}
          className={s.ShopFilterButton}
          variant="rect"
        >
          A-z
        </Button>
        <Button
          onClick={() => sortChanger('price')}
          active={sort === 'price'}
          className={s.ShopFilterButton}
          variant="rect"
        >
          Цена
        </Button>
        <Button
          onClick={() => sortChanger('quantity')}
          active={sort === 'quantity'}
          className={s.ShopFilterButton}
          variant="rect"
        >
          Количество
        </Button>
      </div>
    </div>
  );
};

const ShopPage = observer(({ category }: { category: string }): JSX.Element => {
  const [sort, setSort] = useState<SortField>('price');
  const [sortDir, setSortDir] = useState<SortDirection>('asc');

  const XOR = (a, b) => (a || b) && !(a && b);

  const customSort = (a, b) => {
    const isAsc = sortDir == 'asc';
    const isNext = b[sort] < a[sort];

    return XOR(isNext, isAsc) ? 1 : -1;
  };

  const filteredItems = ShopStore?.Items?.filter(item => {
    const byName = item?.displayName.toLowerCase().includes(ShopStore.Search.toLowerCase());
    const byCategory = category === 'all' || item?.category === category;
    return category ? byName && byCategory : byName;
  }).sort(customSort);
  return (
    <>
      <Controls sort={sort} setSortDir={setSortDir} setSort={setSort} />
      <main className={s.ShopGrid}>
        {filteredItems.map(({ name, displayName, owner, quantity, price, uid }) => (
          <ShopItem
            key={uid}
            name={name}
            quantity={quantity}
            displayName={displayName}
            owner={owner}
            price={price}
            uid={uid}
            category={category}
            inCart={ShopStore?.Cart?.some(item => item.uid === uid)}
            onClick={ShopStore.addToCart}
          />
        ))}
      </main>
    </>
  );
});

export { ShopPage };
export default ShopPage;
