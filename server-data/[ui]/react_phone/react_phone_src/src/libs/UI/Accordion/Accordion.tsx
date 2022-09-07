// core
import React, { useState } from 'react';

// styles
import './Accordion.scss';

interface IProps {
  content: React.ReactChild;
  children: React.ReactNode;
}

function Accordion(props: IProps): JSX.Element {
  const { children, content } = props;
  const [isExpanded, setExpanded] = useState(false);

  const toggle = () => {
    setExpanded(prev => !prev);
  };

  return (
    <div>
      <div className={$('accordion__wrapper', isExpanded && 'is-expanded elevation-3')}>
        <div className="accordion_child" role="presentation" onClick={toggle}>
          {children}
        </div>
        <div className="accordion__menu">{content}</div>
      </div>
    </div>
  );
}

export default Accordion;
