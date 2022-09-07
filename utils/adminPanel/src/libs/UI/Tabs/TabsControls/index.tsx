import React from 'react';
import classNames from 'classnames/bind';
// components
import { Button } from 'libs/UI/Button';
import { Icon } from 'libs/UI/Icon';
// types
import { UITabControls } from 'libs/UI/@types';
// styles
import s from './index.local.scss';

const classes = classNames.bind(s);

const DefaultControl = ({ item, action, activeTab, fill }): JSX.Element => (
  <Button onClick={() => action(item.name)} variant="rounded" active={activeTab === item.name}>
    <Icon name={item.icon} fill={fill && fill} />
  </Button>
);

const LabeledControl = ({ item, action, activeTab, fill, label }) => (
  <div
    className={classNames(s.ControlLabel, activeTab === item.name ? s.ControlLabelActive : null)}
  >
    <Button onClick={() => action(item.name)} variant="rounded" active={activeTab === item.name}>
      <Icon name={item.icon} fill={fill && fill} />
    </Button>
    <p className={s.ControlText}>{label}</p>
  </div>
);

const TabsControls = ({
  pages,
  action,
  activeTab,
  align = 'left',
  size,
  labels = false,
  fill,
  variant = 'top',
}: UITabControls): JSX.Element => {
  const WrapperClass = classes({
    Top: variant === 'top',
    Left: variant === 'left',
    Right: variant === 'right',
    ControlWrapper: true,
  });

  return (
    <nav
      className={WrapperClass}
      style={{
        justifyContent: align,
        gridAutoColumns: `${size}px`,
        gridAutoRows: `${size}px`,
      }}
    >
      {pages.map(item => {
        if (!labels)
          return (
            <DefaultControl
              key={item.name}
              item={item}
              action={action}
              activeTab={activeTab}
              fill={fill}
            />
          );
        return (
          <LabeledControl
            key={item.name}
            item={item}
            action={action}
            activeTab={activeTab}
            label={item.label}
            fill={fill}
          />
        );
      })}
    </nav>
  );
};

export { TabsControls };
export default TabsControls;
