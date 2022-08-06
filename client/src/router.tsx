
import React from 'react';

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
const AdminUser = lazy(() => import('./pages/views/admin/user'));
const AdminArticleList = lazy(() => import('./pages/views/admin/article/list'));
const AdminHome = lazy(() => import('./pages/views/admin/home'));
const AdminArticleEdit = lazy(() => import('./pages/views/admin/article/edit'));
const Forbidden = lazy(() => import('./pages/views/web/403'));
const NotFound = lazy(() => import('./pages/views/web/404'))

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
      },
      {
        path: '/admin/article/list',
        exact: true,
        component: AdminArticleList
      },
      {
        path: '/admin/article/edit/:id',
        exact: false,
        component: AdminArticleEdit
      },
      {
        path: '/admin/article/add',
        exact: false,
        component: AdminArticleEdit
      },
      {
        path: '',
        exact: true,
        component: AdminHome
      },
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
        path: '/403',
        exact: true,
        component: Forbidden
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
      },
      {
        path: '*',
        exact: true,
        component: NotFound
      },
    ]
  },
];



const Routes = () => {

  return (
  <Suspense fallback={<div>loading...</div>}>
    <Router history={history}>
      {createRoute(routeConfig)}
  </Router>
  </Suspense>
)};

export default Routes;
