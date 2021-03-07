import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavContainer from '../components/common/Navbar';
import CalendarContainer from '../components/exercises/Calendar';
import FooterContainer from '../containers/common/FooterContainer';
import { Helmet } from 'react-helmet-async';

function calender() {
    return (
      <>
        <Helmet>
          <title>Calendar</title>  
        </Helmet>
        <HeaderContainer />
        <NavContainer />
        <CalendarContainer />
        <FooterContainer />
      </>
    );
  }
  export default calender;