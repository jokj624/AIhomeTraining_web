import React from 'react';
import {Animated} from "react-animated-css";
 
const First = () => {
    return (
        <>
        <Animated animationIn="fadeIn" animationInDelay="1000">안녕하세요</Animated>
        <Animated animationIn="fadeIn" animationInDelay="2300">운동을 시작해보겠습니다.</Animated>
        <Animated animationIn="fadeIn" animationInDelay="3600">시작 버튼을 누르면 시작합니다.</Animated>
        </>
    );
};

export default First;