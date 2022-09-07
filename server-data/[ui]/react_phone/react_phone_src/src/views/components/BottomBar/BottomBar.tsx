// core
import React from 'react';
import { useHistory } from 'react-router-dom';
// utils
import API from 'API';
// style
import './BottomBar.scss';
// FIXME: проставить типы
export function BottomBar(props): JSX.Element {
  const history = useHistory();
  const { children, variant, barRef, ...rest } = props;

  const handleBackClick = e => {
    e.preventDefault();
    if (history.location.pathname !== '/') {
      history.goBack();
    }
  };

  const handleHomeClick = e => {
    e.preventDefault();
    history.push('/');
  };

  const handleAppsClick = () => {
    API.query('phone/hide', {});
    // clear history
    const backlen = history.length - 1;
    history.go(-backlen);
    history.replace('/', {});
  };

  const generateClasses = suffix => {
    const classes = [`bottom-bar${suffix}`];
    if (variant) {
      classes.push(`bottom-bar${suffix}-${variant}`);
    }
    return classes.join(' ');
  };

  return (
    <>
      <div ref={barRef} className={generateClasses('')} {...rest}>
        {children}
        <div className={generateClasses('__controls')}>
          <div
            className={generateClasses('__button')}
            onClick={handleBackClick}
            role="presentation"
          >
            <svg
              id="triangle"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              width="100%"
              height="100%"
            >
              <polygon fill="transparent" points="0,50 100,0 100,100" strokeWidth="10px" />
            </svg>
          </div>
          <div
            className={generateClasses('__button')}
            onClick={handleHomeClick}
            role="presentation"
          >
            <svg
              id="circle"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              width="100%"
              height="100%"
            >
              <circle cx="50" cy="50" r="45" fill="transparent" strokeWidth="10" />
            </svg>
          </div>
          <div className={generateClasses('__button')}>
            <svg
              id="square"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              width="100%"
              height="100%"
              onClick={handleAppsClick}
            >
              <rect
                cx="50"
                x="10"
                y="10"
                width="80"
                height="80"
                fill="transparent"
                strokeWidth="10"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default BottomBar;
