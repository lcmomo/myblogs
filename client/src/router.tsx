
import * as React from 'react';

import {
  // HashRouter as Router,
  Router, RouteProps } from 'react-router-dom';
import createHistory from 'history/createHashHistory';
// import createBrowsers from 'history/createBrowserHistory';
const history = createHistory();
// const browserHistory = createBrowsers();
import { createRoute } from '@/utils/sub_routes';
const { lazy, Suspense } = React;

const Test = lazy(() => import('./pages/test'));
const WebLayout = lazy(() => import('./pages/layout/web'));
const webHome = lazy(() => import('./pages/views/web/home'));
const Article = lazy(() => import('./pages/views/web/article'));
const About = lazy(() => import('./pages/views/web/about'));
const AdminLayout = lazy(() => import('./pages/layout/admin'));
const AdminUser = lazy(() => import('./pages/views/admin/user'))
const routeConfig: RouteProps[] = [
  {
    path: '/test',
    exact: true,
    component: Test,
    children: []
  },
  {
    path: '/admin',
    exact: true,
    component: AdminLayout,
    children: [
      {
        path: '/admin/user',
        exact: true,
        component: AdminUser
      }
    ]
  },

  {
    path: '/',
    exact: true,
    component: WebLayout,
    children: [
      {
        path: '/',
        redirect: true,
        exact: true,
        component: webHome
      },
      {
        path: '/article/:id',
        exact: true,
        component: Article
      },
      {
        path: '/about',
        exact: true,
        component: About
      }
    ]
  },
];



const Routes = () => {

  return (
  <Suspense fallback={<div>loading...</div>}>
    <Router history={history}>
      {/* <Switch>
      {
        routeConfig.map(r => {
          const { path, exact, component, children } = r;
          // if(children && children.length) {
          //   children.map(item => {
          //     return 
          //   })
          // }
            return (
              <Route exact={ exact } path={ path } component={component} key = { `${path}` } />
            )
          })
      }
    </Switch> */}
    {createRoute(routeConfig)}
  </Router>
  </Suspense>
)};

export default Routes;
