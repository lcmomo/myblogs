import  React from 'react';
import '../../../styles/app.less';
import { Layout, Row, Col, BackTop, Button } from 'antd';
import Header from './header';
// 响应式
const sideLayout = { xxl: 4, xl: 5, lg: 5, sm: 0, xs: 0 };
const contentLayout = { xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24 };

// const toTop = document.querySelector('.app-main') as HTMLElement;
const WebLayout = (props: any) => {
  console.log("enter demo");
  return (
    <Layout className='app-container'>
      <Header />
      <Row className='app-wrapper'>
        <Col {...sideLayout}>
          <div> SideLayout</div>
        </Col>
        <Col {...contentLayout}>
          <div> Main222</div>
        </Col>
      </Row>
      <BackTop />
    </Layout>
  )
  }
export default WebLayout;