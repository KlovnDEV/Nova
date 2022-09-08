// core
import React from 'react';
// style
import './Tab.scss';

interface IProps extends React.ComponentProps<'div'>, IFocusable {
  label: React.ReactNode;
}

// Заглушка, которую использует Tabs, чтобы отрисовывать кнопки и контент табов
function Tab(props: IProps): JSX.Element {
  const { children, ...rest } = props;
  return (
    <>
      <div className="tab" {...rest}>
        {children}
      </div>
    </>
  );
}

export default Tab;
