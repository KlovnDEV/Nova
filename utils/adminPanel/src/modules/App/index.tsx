/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import Storage from './Storage';
import { Button } from './button';
import { Range } from './range';

// global styles
import 'scss/main.scss';
import { Tooltip } from './tooltip';
import { Icon } from 'libs/UI';

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const AppProto = ({ children }: IProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="app">
      <nav className="app__topbar">
        {/* Test
        <Button
          onClick={() => {
            alert('def!');
          }}
        >
          My Test Button
        </Button> */}
      </nav>
      <nav className="app__leftbar">
        <button type="button" className="app__leftbar_button">
          <Icon name="man" />
        </button>
      </nav>
      <div className="app__leftpanel">&nbsp;</div>
      <main
        ref={ref}
        className="app__map"
        style={{ position: 'relative' }}
        onContextMenu={e => {
          e.preventDefault();
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default observer(AppProto);
