import React, { useState } from "react";
import styled from "styled-components";

const Progress = styled.div`
    backgrond-color: #d8d8d8;
    border-radius: 20px;
    position: relative;
    height: 30px;
    width: 450px;
    top : 200px;
    margin : 0 auto;
    @media (max-width: 750px) {
        width: 350px;
        height : 500px
    }
`;

const Done = styled.div`
    background: linear-gradient(to left, #8BC4C1, #65A1A0);
    box-shadow: 0 3px 3px -5px #8BC4C1, 0 2px 5px #8BC4C1;
    border-radius: 20px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    hegiht: 100%;
    width: 0;
    opacity: 0;
    transition: 3s ease;
    margin-top: 5%;
`;

const Text = styled.span`
    font-weight: bold;
    font-size: 1.5em;
`;
const LoadingBar = ({ done }) => {
    const [style, setStyle] = useState({});
    setTimeout(()=> {
        const newStyle = {
            opacity: 1,
            width: `${done}%`
        }
        setStyle(newStyle);
    }, 300);
//가운데 정렬 되도록 수정해야함
    return (
        <Progress>
            <Text>분석 중입니다.</Text>
            <Done style={style}>{done}%</Done>
        </Progress>
    )
}


export default LoadingBar;