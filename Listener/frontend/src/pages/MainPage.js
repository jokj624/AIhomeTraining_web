import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavContainer from '../components/common/Navbar';
import { Helmet } from 'react-helmet-async';
function main() {
  return (
    <>
    <Helmet>
      <title>Main</title>
    </Helmet>
      <HeaderContainer />
      <NavContainer />
    </>
  );
}
export default main;