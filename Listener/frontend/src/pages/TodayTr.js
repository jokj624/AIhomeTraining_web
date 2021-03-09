import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavContainer from '../components/common/Navbar';
import { Helmet } from 'react-helmet-async';
import ExerciseContainer from '../containers/exercise/ExerciseContainer';
import FooterContainer from '../containers/common/FooterContainer';
import styled  from 'styled-components';

const Background = styled.div`
background: -webkit-linear-gradient(110deg, #8c9fbf 40%, #e9ecef 40%);
background: -o-linear-gradient(110deg,   #8c9fbf 40%, #e9ecef 40%);
background: -moz-linear-gradient(110deg,#8c9fbf 40%, #e9ecef 40%);
background: linear-gradient(110deg,   #8c9fbf 40%, #e9ecef 40%);
`;

const TodayTr = () => {
    return (
        <>
        <Helmet>
            <title>Today</title>
        </Helmet>
        <Background>
        <HeaderContainer/>
        <NavContainer/>
        <ExerciseContainer/>
        <FooterContainer />
        </Background>
        </>
    );
};

export default TodayTr;