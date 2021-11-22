import  React from 'react';
import '../../../styles/app.less';
import { Layout, Row, Col, BackTop, Button } from 'antd';
import Header from './header';
import {useSelector, useDispatch } from 'react-redux'
import { decrement, increment, selectCount, incrementAsync } from '@/store/slice/common'
// 响应式
const sideLayout = { xxl: 4, xl: 5, lg: 5, sm: 0, xs: 0 };
const contentLayout = { xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24 };

// const toTop = document.querySelector('.app-main') as HTMLElement;


const WebLayout = (props: any) => {
  console.log("enter demo");
  const count = useSelector(selectCount);
  console.log("count22: ", count)
  const dispatch = useDispatch();
  // const increaseValue = useCallback(
  //   () => {
  //     dispatch(increment());
  //   },
  //   [],
  // )
  return (
    <Layout className='app-container'>
      <Header />
      <Row className='app-wrapper'>
        <Col {...sideLayout}>
          <div> SideLayout22</div>
        </Col>
        <Col {...contentLayout}>
          <div> Main2
            <div>
              count: <span>{count}</span>
            </div>
            <Button type="primary" onClick={() => dispatch(increment())}>add</Button>
            <Button type="text" onClick={() => dispatch(decrement())}>adecr</Button>
            <Button type="text" onClick={() => dispatch(incrementAsync(10))}>adecrAy</Button>
          </div>
        </Col>
      </Row>
      <BackTop />
    </Layout>
  )
  }
export default WebLayout;