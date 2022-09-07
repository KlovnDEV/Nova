import React from 'react';
import classNames from 'classnames/bind';
// types
import { UITabContent } from 'libs/UI/@types';
// styles
import { observer } from 'mobx-react';
import s from './index.local.scss';

const TabsContentProto = ({ item, anchor, className, fade, active }: UITabContent): JSX.Element => (
  <div
    data-parent={anchor}
    className={classNames(
      s.TabsContent,
      active ? s['is-active'] : null,
      fade ? s[`Fade-${fade}`] : null,
      className,
    )}
  >
    {item}
  </div>
);

const TabsContent = observer(TabsContentProto);

export { TabsContent };
export default TabsContent;
