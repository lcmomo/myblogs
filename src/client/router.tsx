
import * as React from 'react';

import { Router, Switch, Route , RouteProps} from 'react-router-dom';
import history from './history';
const { lazy, Suspense } = React;

// const Test = lazy(() => import('./test'));
import Test from './test'

const routes: RouteProps[] = [
  {
    path: '/test',
    exact: true,
    component: Test
  }
];

const Routes = () => (
  // <Suspense fallback={()=> (<div>loading</div>)}>
  //   <Switch>
  //   {
  //     routes.map(r => {
  //         const { path, exact, component } = r;
  //         return (
  //             <Route key = { path + '' } exact = { exact } path = { path } component={component} />

  //         )

  //     })
  //     }
  // </Switch>
  // </Suspense>
  <Route path='/test' component={Test}/>
);

export default Routes;
