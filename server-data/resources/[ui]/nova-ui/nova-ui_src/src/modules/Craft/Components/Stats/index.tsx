import React from 'react';
import { observer } from 'mobx-react';
// styles
import s from './index.local.scss';
import Storage from '~m/Craft/Storage';

const Lookup = {
  food: { name: 'Еда', type: 'buff' },
  water: { name: 'Вода', type: 'buff' },
  alcohol: { name: 'Алкоголь', type: 'debuff' },
};

const Stats = observer((): JSX.Element => {
  const { CraftOutputData } = Storage;

  if (!CraftOutputData) return null;

  const renderStat = (key, value): JSX.Element => {
    let Buff;
    const target = Lookup[key];
    if (target.type === 'debuff') {
      Buff = value > 0 ? s.Debuff : s.Buff;
    }

    if (target.type === 'buff') {
      Buff = value > 0 ? s.Buff : s.Debuff;
    }

    if (value === 0) return null;

    return (
      <p key={key}>
        <span className={s.Target}>{target.name}&nbsp;</span>
        <sup className={Buff}>
          {value > 0 ? '+' : null}
          {value}
        </sup>
      </p>
    );
  };

  const renderFood = (): JSX.Element[] => {
    return Object.entries(JSON.parse(CraftOutputData.extra)).map(([key, stat]) =>
      renderStat(key, stat),
    );
  };

  const getStatsData = (): JSX.Element[] => {
    switch (CraftOutputData.category) {
      case 'food':
      case 'drink':
      case 'alcohol':
        return renderFood();
      default:
        return null;
    }
  };

  return (
    <div className={s.Stats}>
      {/* {CurrentRecipe.stats.map(stat => (
          <span key={stat}>{stat}</span>
        ))} */}
      {getStatsData()}
    </div>
  );
});

export { Stats };
export default Stats;
