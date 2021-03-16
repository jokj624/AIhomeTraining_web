import React, { useState } from 'react';
import styled from "styled-components";
import palette from '../../lib/style/palette';
import squatIcon from '../../img/squatIcon.png';
import lungeIcon from '../../img/lungeIcon.png';
import pressIcon from '../../img/pressIcon.png';
import treeIcon from '../../img/treeIcon.png';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';


const Ex = styled.div`
    position: relative;
    width: 90%;
    left: 5%;
    text-align: center;
    align-items : center;
    border-radius: 5px;
    box-shadow: 5px 5px 5px 5px gray;
    padding-bottom: 2rem;
    background-color: #f7f7f7;
    h2{
        padding-top: 15px;
        font-weight: bold;
        font-size : 1.5em;
        margin-bottom : 40px;
    }

    @media (max-width: 768px) {
        height : 1900px;
    }

`
const MtDiv = styled.div`
    display : block;
    margin-top : 20px;

`
const Mait = styled.div`
    font-size: 1.5em;
    color: black;
    font-style: oblique;
    font-weight: bold;
    &:hover{
        color: gray;
        text-decoration: none;
    }
`;

const Mt = styled.div`
    font-size: 1.5em;
    color: black;
    ul {
        padding : 0;
        list-style-type:none;
    }
    li {
        font-size : 1rem;
    }
`;

const Ai = styled.span`
  color : ${palette.indigo[9]};
`;
const ExLabel = styled.div`
    margin-top : 20px;
    padding : 30px;
    width : 90%;
    display: flex;
    transform: translateX(5%);
    justify-content: space-between; /* 자식 엘리먼트 사이에 여백을 최대로 설정 */
    @media (max-width: 768px) {
        display : block;
        padding : 30px;
      }

`
const Pose = styled.div`
    display : inline-block;
    top : 0;
    img {
        width : 90px;
        margin-bottom : 20px;
    }
    h3 {
        font-family: 'Gothic A1', sans-serif;
        font-size : 1rem;
    }
    h4 {
        font-family: 'Gothic A1', sans-serif;
        font-size : 0.95rem;
    }
    @media screen and (max-width: 768px) {
        display : block;
        border-bottom : solid rgba(0, 0, 0, .3);
        margin-bottom : 15px;
    }
`;
const ScoreDiv = styled.div`
    width : 100%;
   text-align : center;
`

const Score = styled.div`
    width : 200px;
    height : 200px;
    border-radius : 50%;
    display : inline-block;
    box-shadow: 4px 7px 7px 1px rgba(0, 0, 0, 0.3);
    h3 {
        font-family: 'Gothic A1', sans-serif;
        font-size : 2.75rem;
        text-align : center;
        line-height : 210px;
    }
    
`

const Grade = styled.div`
    position : absolute;
    left : 50%;
    color : red;
    font-size : 5rem;
    font-family: 'Gothic A1', sans-serif;
    font-style : italic;
    transform: translate(-120%, -10%);
`

const ExerciseResult = ({ mistakes }) => {

    let squat = mistakes[0].squat;
    let lungeL = mistakes[0].lungeL;
    let lungeR = mistakes[0].lungeR;
    let press = mistakes[0].press;
    let tree = mistakes[0].tree;
    console.log(mistakes);

    let squatMt, lungeLMt, lungeRMt, pressMt, treeMt;

    if (squat.length == 0)  squatMt = <li>완벽합니다!</li>;
    else squatMt = squat.map((value) => <li>{value}</li>);

    if (lungeL.length == 0)  lungeLMt = <li>완벽합니다!</li>;
    else lungeLMt = lungeL.map((value) => <li>{value}</li>);

    if (lungeR.length == 0)  lungeRMt = <li>완벽합니다!</li>;
    else lungeRMt = lungeR.map((value) => <li>{value}</li>);

    if (press.length == 0)  pressMt = <li>완벽합니다!</li>;
    else pressMt = press.map((value) => <li>{value}</li>);

    if (tree.length == 0)  treeMt = <li>완벽합니다!</li>;
    else treeMt = tree.map((value) => <li>{value}</li>);

    let mtNum = squat.length + lungeL.length + lungeR.length + press.length + tree.length;

    let grade

    if (mtNum == 0 || mtNum == 1) grade = 'A+';
    else if (mtNum == 2 || mtNum == 3) grade = 'A-';
    else if (mtNum == 4 || mtNum == 5) grade ='B+';
    else if (mtNum == 6 || mtNum == 7) grade ='B-';
    else if (mtNum == 8 || mtNum == 9) grade ='C+';
    else if (mtNum == 10 || mtNum == 11) grade ='C-';
    else if (mtNum == 12) grade ='D+';
    else if (mtNum == 13) grade ='D-';
    else if (mtNum == 14) grade ='F!!';

    let fail = 14-mtNum;

    return(
        
        <Ex>
            <div style = {{ paddingTop: '10px', paddingBottom: '10px', backgroundColor: '#e9e9e9'}} >
            <Mait>M<Ai>AI</Ai>T</Mait>
            </div>
            <h2>오늘의 운동 결과</h2>
            <ScoreDiv>
                <Grade>{grade}</Grade>
            <Score>
                <h3>{fail}/14</h3>
            </Score>
            </ScoreDiv>
            <ExLabel>
            <Pose>
                <img src = {squatIcon}/>
                <h3>스쿼트</h3>
                <KeyboardArrowDownIcon/>
                <MtDiv>
                <Mt>
                    <ul>
                    {squatMt}
                    </ul>
                </Mt>
                </MtDiv>
            </Pose>

            <Pose>
                <img src = {lungeIcon}/>
                <h3>런지</h3>
                <KeyboardArrowDownIcon/>
                <MtDiv>
                    <h4>왼쪽</h4>
                    <Mt>
                        <ul>
                        {lungeLMt}
                        </ul>
                    </Mt>
                </MtDiv>
                <MtDiv>
                    <h4>오른쪽</h4>
                    <Mt>
                        <ul>
                        {lungeRMt}
                        </ul>
                    </Mt>
                </MtDiv>
            </Pose>

            <Pose>
                <img src = {pressIcon}/>
                <h3>숄더프레스</h3>
                <KeyboardArrowDownIcon/>
                <MtDiv>
                <Mt>
                    <ul>
                    {pressMt}
                    </ul>
                </Mt>
                </MtDiv>
            </Pose>

            <Pose>
                <img src = {treeIcon} style ={{width : '120px', height :"90px"}}/>
                <h3>나무자세</h3>
                <KeyboardArrowDownIcon/>
                <MtDiv>
                <Mt>
                    <ul>
                {treeMt}
                </ul>
                </Mt>
                </MtDiv>
            </Pose>
            </ExLabel>

        </Ex>
    );
};

export default ExerciseResult;