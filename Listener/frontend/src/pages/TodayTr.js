import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavContainer from '../components/common/Navbar';
import { Helmet } from 'react-helmet-async';
import ExerciseContainer from '../containers/exercise/ExerciseContainer';
import FooterContainer from '../containers/common/FooterContainer';

const TodayTr = () => {
    return (
        <>
        <Helmet>
            <title>Today</title>
        </Helmet>
        <HeaderContainer/>
        <NavContainer/>
        <ExerciseContainer/>
        <FooterContainer />
        </>
    );
};

export default TodayTr;