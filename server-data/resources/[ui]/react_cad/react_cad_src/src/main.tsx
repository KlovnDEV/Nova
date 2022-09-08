// core
import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { HashRouter, MemoryRouter } from 'react-router-dom';
// components
import App from 'modules/App/App';

let VariativeRouter = MemoryRouter;

if (DEVELOPMENT) {
  VariativeRouter = HashRouter;
}

configure({
  enforceActions: 'never',
});

ReactDOM.render(
  <Provider>
    <VariativeRouter>
      <div
        className="wrapper"
        style={{
          backgroundImage: DEVELOPMENT ? 'url(assets/img/bg.jpg)' : '',
        }}
      >
        <App />
      </div>
    </VariativeRouter>
  </Provider>,
  document.querySelector('#root'),
);
