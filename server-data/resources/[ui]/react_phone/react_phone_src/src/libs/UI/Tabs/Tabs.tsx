// core
import React, { useRef } from 'react';
import useMeasure from 'react-use-measure';
// ui
import Control from '../Control/Control';
import TabButton from '../TabButton/TabButton';
// style
import './Tabs.scss';

interface IProps {
  children?: React.ReactNode;
  down?: boolean;
  center?: boolean;
  onTabClick?: React.MouseEventHandler<HTMLDivElement>;
  activeTab: string;
}

function Tabs(props: IProps): JSX.Element {
  const { children, down, center, onTabClick } = props;
  let { activeTab } = props;

  const [activeButtonRef, activeButtonRect] = useMeasure();
  const [buttonsRef, buttonsRect] = useMeasure();

  const indicatorRef = useRef();

  if (!activeTab) {
    activeTab = children[0]?.key;
  }

  return (
    <Control className={$('tabs', down ? 'tabs_down' : 'tabs_up')}>
      <div
        className="tabs__buttons elevation-4"
        ref={buttonsRef}
        style={{ justifyContent: center ? 'center' : 'flex-start' }}
      >
        <div
          ref={indicatorRef}
          className="tabs__indicator"
          style={{
            left:
              buttonsRect?.left && activeButtonRect?.left
                ? activeButtonRect.left - buttonsRect.left
                : 0,
            width: buttonsRect?.left && activeButtonRect?.left ? activeButtonRect.width : 0,
          }}
        />
        {Object.keys(children).map((key, index) => {
          const child = children[key];
          if (!child.props.label) return null;
          let ref2 = null;
          if (child.key === activeTab) ref2 = activeButtonRef;

          return (
            <TabButton
              ref={ref2}
              key={child.key}
              tabIndex={index}
              focus={child.props.focus}
              label={child.props.label}
              selected={child.key === activeTab}
              onClick={() => {
                if (onTabClick) onTabClick(child.key);
              }}
            />
          );
        })}
      </div>

      <div className="tabs__content">
        {Object.keys(children).map(key => {
          const child = children[key];
          if (!child.props.label) return null;
          if (child.key !== activeTab) return null;

          return (
            <div key={child.key} className="tabs__content-pane">
              {child.props.children}
            </div>
          );
        })}
      </div>
    </Control>
  );
}

export default Tabs;
