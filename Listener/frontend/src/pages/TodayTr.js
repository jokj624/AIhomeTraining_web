import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavContainer from '../components/common/Navbar';
//import sketch from '../components/common/DrawP5';
//import P5Wrapper from 'react-p5-wrapper';
import { Helmet } from 'react-helmet-async';
import ExerciseContainer from '../containers/exercise/ExerciseContainer';

const TodayTr = () => {
    return (
        <>
        <Helmet>
            <title>Today</title>
        </Helmet>
        <HeaderContainer/>
        <NavContainer/>
        <div style={{textAlign:'center'}}>
        <ExerciseContainer/>
        </div>
        </>
    );
};

export default TodayTr;