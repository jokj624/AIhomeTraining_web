import React from 'react';
import './main.css'
import HeaderContainer from '../containers/common/HeaderContainer';

function main() {
  return (
    <>
      <HeaderContainer />
      <nav>
          <span>오늘의 운동</span>
          <span>운동 일지</span>
          <span>마이페이지</span>
      </nav>
    </>
  );
}
export default main;