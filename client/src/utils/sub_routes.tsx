import React from 'react'

import { Route, RouteProps, Switch, Redirect, RouteComponentProps, RouteChildrenProps } from 'react-router-dom';
// import createHistory from 'history/createHashHistory';
// const history = createHistory();
const renderRouter = (routes?: Array<RouteProps>) => {
  let children: any = [];

  const renderRoute = (route?: RouteProps)  => {
    const { path, component } = route;
    const role = 1;
    if (path.includes('admin') && role !== 1) {
      route = {
        ...route,
        component: () => <Redirect to='/' />,
        children: []
      }
    }
    if (!component) return;
    if (route.children) {
      const childRoutes = renderRouter(route.children as Array<RouteProps>);
      children.push(<Route key={ `${path}` } {...route}>{childRoutes}</Route>);
      (route.children as Array<RouteProps>).forEach((r: RouteProps) => renderRoute(r));
    } else {
      children.push(<Route key={ `${path}` } {...route}></Route>)
    }
  }
  routes.forEach(item => renderRoute(item));
  return <Switch>{children}</Switch>;
}

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
    // props.history.listen(path => {    //  路由监听

    // });
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