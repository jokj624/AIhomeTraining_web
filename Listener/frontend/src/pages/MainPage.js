import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavContainer from '../components/common/Navbar';
import Main from '../components/common/Main';
import FooterContainer from '../containers/common/FooterContainer';


function main() {
  return (
    <>
      <HeaderContainer />
      <NavContainer />
      <Main />
      <FooterContainer/>
    </>
  );
}
export default main;