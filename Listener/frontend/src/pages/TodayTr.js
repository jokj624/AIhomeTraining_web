import React, {useState, useCallback } from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavContainer from '../components/common/Navbar';
//import sketch from '../components/common/DrawP5';
import Test from '../components/common/Test';
//import P5Wrapper from 'react-p5-wrapper';

const TodayTr = () => {
    const [labels, setLabels] = useState('분석 중');
 //   let label = '분석 중';
    /*const displayState = ({label}) => {
        setLabels({label});
        //console.log(label);
    };*/
    const displayState = (label) => {
        setLabels(label);
    };
    return (
        <>
        <HeaderContainer/>
        <NavContainer/>
        <Test/>
        <h2>{labels}</h2>
        </>
    );
};

export default TodayTr;