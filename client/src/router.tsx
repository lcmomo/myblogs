
import * as React from 'react';

import { HashRouter as Router, Switch, Route, RouteProps } from 'react-router-dom';
// import createHistory from 'history/createHashHistory';
// const history = createHistory();
const { lazy, Suspense } = React;

const Test = lazy(() => import('./pages/test'));
const WebLayout = lazy(() => import('./pages/layout/web'));

const routes: RouteProps[] = [
  {
    path: '/test',
    exact: true,
    component: Test
  },
  {
    path: '/',
    exact: true,
    component: WebLayout
  }
];

const Routes = () => (
  <Suspense fallback={<div>loading...</div>}>
    <Router>
      <Switch>
      {
        routes.map(r => {
          const { path, exact, component } = r;
            return (
              <Route exact={ exact } path={ path } component={component} key = { `${path}` } />
            )
          })
      }
    </Switch>
  </Router>
  </Suspense>
);

export default Routes;
