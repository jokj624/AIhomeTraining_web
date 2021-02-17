import React, {useState} from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavContainer from '../components/common/Navbar';
import sketch from '../components/common/DrawP5';
import P5Wrapper from 'react-p5-wrapper';
import { Helmet } from 'react-helmet-async';

const TodayTr = () => {
    let poseLabel = "분석중";
    /*
    const [labels, setLabels] = useState('분석 중');
    */
    /*
    const displayState = ({ label }) => {
        setLabels(label);
        console.log(label);
    };
    */
    return (
        <>
        <Helmet>
            <title>Today</title>
        </Helmet>
        <HeaderContainer/>
        <NavContainer/>
        <P5Wrapper sketch={sketch} /*displayState = {displayState}*/ />
        <h2>{poseLabel}</h2>
        </>
    );
};

export default TodayTr;