import React from 'react';
import classNames from 'classnames/bind';
// components
import { Icon } from 'libs/UI/Icon';
import { InputField } from 'libs/UI/InputField';
import { TabsControls } from './TabsControls';
import { TabsContent } from './TabsContent';
// styles
import s from './index.local.scss';
// types
import { UITabs } from '../@types';

const classes = classNames.bind(s);

const Tabs = ({
  pages,
  children,
  searchFunc,
  align = 'left',
  contentWrapperClass,
  parentWrapperClass,
  controlFillColor,
  size = 60,
  fade = undefined,
  variant = 'top',
  activeTab,
  setActiveTab,
  labels = false,
}: UITabs): JSX.Element => {
  const TabWrapperClass = classes({
    Top: variant === 'top',
    Left: variant === 'left',
    Right: variant === 'right',
    [parentWrapperClass]: parentWrapperClass,
  });

  const Content = children.map(item => (
    <TabsContent
      item={item}
      key={item.key}
      anchor={item.key}
      className={contentWrapperClass}
      active={item.key === activeTab}
      fade={fade}
    />
  ));

  return (
    <div className={TabWrapperClass}>
      <TabsControls
        pages={pages}
        action={setActiveTab}
        activeTab={activeTab}
        align={align}
        size={size}
        labels={labels}
        variant={variant}
        fill={controlFillColor}
      />
      <div className={s.Tabs}>
        {searchFunc && (
          <div className={s.SearchWrapper}>
            <InputField
              type="text"
              name="search"
              className={s.Search}
              placeholder="Поиск рецепта"
              onChange={searchFunc}
            />
            <Icon name="search" className={s.SearchIcon} />
          </div>
        )}
        {Content}
      </div>
    </div>
  );
};

export { Tabs };
export default Tabs;
