/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { KeyboardEvent, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { observer } from 'mobx-react';
import { Button, Icon } from 'libs/UI';
import API from 'API';
import Storage from './Storage';
import s from './index.local.scss';

const AnimationsProto = (): JSX.Element => {
  const wrapperRef = useRef<HTMLDivElement>();

  useEffect(() => {
    wrapperRef.current.focus();
  }, []);

  const clickItem = (key, item) => {
    if (item.items) {
      Storage.Cells = item.items;

      return false;
    }

    API.query('animations/start', { value: key });
    return true;
  };

  const clickFavorite = (key, item) => {
    API.query('animations/favorite', { value: key, label: item.label });
  };

  const onClickHandler = (e, item, key) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target.dataset.favorite) {
      clickFavorite(key, item);
      return false;
    }

    return clickItem(key, item);
  };

  const sortCells = (a, b) => {
    const cell1 = a[1].hotkey;
    const cell2 = b[1].hotkey;

    if (Number.isNaN(+cell1) && !Number.isNaN(+cell2)) {
      return -1;
    }
    if (!Number.isNaN(+cell1) && Number.isNaN(+cell2)) {
      return 1;
    }

    return cell1 > cell2 ? 1 : -1;
  };
  const onKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    const cellData = Object.entries(Storage.Cells).find(
      ([key, val]) => val.hotkey.toUpperCase() === e.key.toUpperCase(),
    );

    if (cellData) {
      clickItem(cellData[0], cellData[1]);
    }
  };

  return (
    <div
      role="presentation"
      className={s.AnimationsWrapper}
      onKeyUp={onKeyUp}
      tabIndex={0}
      ref={wrapperRef}
    >
      <div className={s.Animations}>
        {Object.entries(Storage.Cells)
          .sort(sortCells)
          .map(([key, item]) => (
            <Button
              key={key}
              onClick={e => onClickHandler(e, item, key)}
              className={s.Item}
              variant="rect"
            >
              <span className={s.ItemHead}>
                <span className={s.ItemAnchor}>{item.hotkey}</span>
                {item.icon ? <Icon className={s.ItemIcon} name={`anim-${key}`} /> : null}
                {!item.items && (
                  <span className={s.ItemFavoriteWrapper}>
                    {item.favorite && <span className={s.ItemFavoriteKey}>{item.favorite}</span>}
                    <span
                      className={classNames(
                        s.ItemFavorite,
                        item.favorite ? s['is-favorite'] : null,
                      )}
                      data-favorite
                    >
                      ⭐
                    </span>
                  </span>
                )}
              </span>
              <span className={s.ItemText}>{item.label}</span>
            </Button>
          ))}
      </div>
    </div>
  );
};

export const Animations = observer(AnimationsProto);
export default Animations;
