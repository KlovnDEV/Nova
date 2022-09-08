import React from 'react';
import s from 'views/devViewsControls.local.scss';
import Storage from '~m/Menu/Storage';

const GameMenu = (): JSX.Element => {
  const onClick = e => {
    e.preventDefault();
    const res = e.target.innerText
      .split(' ')
      .map(i => i.charAt(0))
      .join('');

    Storage.position = res;
  };

  return (
    <>
      {DEVELOPMENT && (
        <div className={s.Controls}>
          <button type="button" onClick={e => onClick(e)}>
            top left
          </button>
          <button type="button" onClick={e => onClick(e)}>
            top center
          </button>
          <button type="button" onClick={e => onClick(e)}>
            top right
          </button>
          <button type="button" onClick={e => onClick(e)}>
            center right
          </button>
          <button type="button" onClick={e => onClick(e)}>
            center center
          </button>
          <button type="button" onClick={e => onClick(e)}>
            center left
          </button>
          <button type="button" onClick={e => onClick(e)}>
            bottom left
          </button>
          <button type="button" onClick={e => onClick(e)}>
            bottom center
          </button>
          <button type="button" onClick={e => onClick(e)}>
            bottom right
          </button>
        </div>
      )}
    </>
  );
};

export default GameMenu;
