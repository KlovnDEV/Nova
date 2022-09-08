import React, { useState } from 'react';
import { observer } from 'mobx-react';
// styles
import styles from './Tabs.module.scss';

function TabsButton({ text, className, ...rest }) {
  return (
    <button type="button" className={$(styles.TabsButton, className || '')} {...rest}>
      {text}
    </button>
  );
}

function TabsContent({ children, className }) {
  return <div className={$(styles.TabsContent, className || '')}>{children}</div>;
}

const TabsProto = ({
  children,
  defaultPage,
  onTabChange,
}: {
  children: JSX.Element[];
  defaultPage?: string;
  onTabChange?: any;
}) => {
  const [activeTab, setActiveTab] = useState(defaultPage || children[0].key);

  const isActive = bool => bool && 'is-active';

  return (
    <div className={styles.TabsWrapper}>
      <div className={styles.TabsHead}>
        {children.map(item => {
          if (!item.key) return null;
          return (
            <TabsButton
              key={item.key}
              text={item.key}
              className={isActive(activeTab === item.key)}
              onClick={() => {
                setActiveTab(item.key);
                if (onTabChange) onTabChange(item.key);
              }}
            />
          );
        })}
      </div>
      <div className={styles.TabsBody}>
        {children.map(item => {
          if (!item) return null;
          if (!item.key) return null;
          return (
            <TabsContent key={item.key} className={isActive(activeTab === item.key)}>
              {item}
            </TabsContent>
          );
        })}
      </div>
    </div>
  );
};

export const Tabs = observer(TabsProto);
export default observer(TabsProto);
