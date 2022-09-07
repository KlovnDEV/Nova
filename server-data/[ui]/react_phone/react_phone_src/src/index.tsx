// core
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { MemoryRouter as Router } from 'react-router-dom';
// utils
// components
import Events from './API/Events';
import App from 'modules/App/App';

ReactDOM.render(
  <>
    <Events />
    <Provider>
      <Router>
        <div
          className="wrapper"
          style={{
            width: '100vw',
            height: '100vh',
            backgroundColor: 'transparent',
          }}
        >
          <App />
        </div>
      </Router>
    </Provider>
  </>,
  document.querySelector('#root'),
);
