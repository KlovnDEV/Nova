import React from 'react';
import { Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { ErrorBoundary } from '../ErrorBoundary';

import './AnimatedRoute.scss';

export const AnimatedRoute = (props: {
  path: string;
  exact?: boolean;
  component: any;
}): JSX.Element => {
  const { path, exact = false, component: Component } = props;

  return (
    <ErrorBoundary>
      <Route path={path} exact={exact}>
        {({ match }) => {
          return (
            <CSSTransition
              in={match !== null}
              key={path}
              classNames="route-animation-opacity"
              timeout={200}
              unmountOnExit
              style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
            >
              <div className="route-animation-opacity">
                <Component routeMatch={match} />
              </div>
            </CSSTransition>
          );
        }}
      </Route>
    </ErrorBoundary>
  );
};

export default AnimatedRoute;
