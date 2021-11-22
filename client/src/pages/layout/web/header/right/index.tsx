import React, { useReducer } from 'react';
import NavBar from './navbar';
import Search from './search';
import UserInfo from './userInfo';
const HeaderRight = (props: any) => {
  return (
    <div className="header-right">
      <Search />
      <UserInfo />
      <NavBar />
    </div>
  )
};

export default  HeaderRight;
