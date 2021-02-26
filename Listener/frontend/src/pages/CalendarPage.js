import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavContainer from '../components/common/Navbar';
import CalendarContainer from '../components/exercises/Calendar';
import FooterContainer from '../containers/common/FooterContainer';

function calender() {
    return (
      <>
        <HeaderContainer />
        <NavContainer />
        <CalendarContainer />
        <FooterContainer />
      </>
    );
  }
  export default calender;