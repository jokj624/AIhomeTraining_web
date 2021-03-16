import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavContainer from '../components/common/Navbar';
import { Helmet } from 'react-helmet-async';
import ExerciseContainer from '../containers/exercise/ExerciseContainer';
import FooterContainer from '../containers/common/FooterContainer';
import styled  from 'styled-components';

const Background = styled.div`
background: linear-gradient(120deg, #d8e2ed 33%, #f5f5f5 33%);
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
        <ExerciseContainer style = {{overflowX : "hidden"}}/>
        <FooterContainer />
        </Background>
        </>
    );
};

export default TodayTr;