import React from 'react'

import { Route, RouteProps, Switch, Redirect, RouteComponentProps, RouteChildrenProps } from 'react-router-dom';
import { get } from './storage';
import { USER_ROLES } from '@/config';
import { decodeToken } from './token';
import { JwtPayload } from 'jsonwebtoken';
// import createHistory from 'history/createHashHistory';
// const history = createHistory();

const currentUser  = (decodeToken(get('token')) as JwtPayload);
const role  = currentUser?.role;

export type MyRouteComponentProps = React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>

//该组件通过递归的方式，将所有route中带有children路由的父路由进行解构,最终用createBasicRoute函数来渲染
const createFixRoute = (route: any, index: string) => {
  const { path, component: RouteComponent, children } = route;
  if (children) {
    return (
      <Route
        key={index}
        path={path}
        children={(props: RouteChildrenProps )=> {
          let redirectPath = null;
          return <RouteComponent {...props}>
            <Switch>
              {children.map((child: any, index2: string) => {
                const { path: childPath, redirect } = child;
                if (redirect){
                  redirectPath = childPath;
                }
                return createFixRoute({...child, path: childPath}, `${index}-${index2}`);
              })}
              {/* <Redirect from={`${path}`} to={`${path}${redirectPath || children[0].path}`} /> */}
            </Switch>
          </RouteComponent>;
        }}
      />
    );
  } else {
    return createBasicRoute(route, index);
  }
};

export const createBasicRoute = (route: RouteProps, index: string) => {    //  最基础的Router 用法
  const { path, component: Component } = route;
  return <Route exact key={index} path={path} component={(props: any)=> {
    props.history.listen((path:  any)=> {    //  路由监听
      const { pathname } = path;
      if (pathname.includes('admin') && role !== USER_ROLES.ADMIN) {
        props.history.push('/403');
      }
    });
    return <Component {...props} />;
  }} />;
};

export const createRoute = (routes: Array<RouteProps>) => {
  return (
    <Switch>
      {
        routes.map((route: RouteProps, index: any) =>
          createFixRoute(route, index)
        )
      }
      {/* <Redirect from='/*' to='/' /> */}
    </Switch>
  );
};