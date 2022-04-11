import  React from 'react';
import { Layout, Row, Col, BackTop, Button } from 'antd';
import {useSelector, useDispatch } from 'react-redux';
import '@/styles/app.less';
import Header from './header';
import SideBar from './sidebar';
import AppMain from './main';
import { decrement, increment, selectCount, incrementAsync } from '@/store/slice/common';

// 响应式
const sideLayout = { xxl: 4, xl: 5, lg: 5, sm: 0, xs: 0 };
const contentLayout = { xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24 };

// const toTop = document.querySelector('.app-main') as HTMLElement;


const WebLayout = (props: any) => {
  
  const count = useSelector(selectCount);
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
          <SideBar />
        </Col>
        <Col {...contentLayout}>
          <AppMain {...props} />
        </Col>
      </Row>
      <BackTop />
    </Layout>
  )
  }
export default WebLayout;