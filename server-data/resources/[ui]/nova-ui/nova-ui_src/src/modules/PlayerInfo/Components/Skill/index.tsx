import React from 'react';
import { observer } from 'mobx-react';
import s from './index.local.scss';

const Skill = observer((props): JSX.Element => {
  const { label, value } = props;

  return (
    <div className={s.SkillRow}>
      <p className={s.SkillLabel}>{label}</p>
      <progress className={s.SkillProgress} value={value} max={100} />
    </div>
  );
});

export { Skill };
export default Skill;
