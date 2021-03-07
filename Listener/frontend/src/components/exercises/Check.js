import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {Animated} from "react-animated-css";
import LoadingBar from '../common/LoadingBar';
import './Check.css';
import Responsive from '../common/Responsive';

const Wrapper = styled.div`
  position:relative;
  height: 600px;
  text-align: center;
`;

const Loading = styled(Responsive)`
    display: flex;
    width: 100%;
    align-items: center;

`;

const Check = ({analysis}) => {
    const [showResults, setShowResults] = useState(false);
    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
        form: auth.modify,
        auth: auth,
        authError: auth.authError,
        user: user.user
      }));
    
    let userAngle = [
      {
        exname: "스쿼트",
        angle: []
      },
      {
        exname: "사이드 런지 왼쪽",
        angle: []
      },
      {
        exname: "사이드 런지 오른쪽",
        angle: []
      },
      {
        exname: "숄더 프레스",
        angle: []
      }
    ];

    const hours = parseInt(user.s/60/60);
    const minutes = parseInt(user.s%(60*60)/60);
    const seconds = parseInt(user.s%60);

    const angle = (exer) => {   //user의 좌표로 8개의 인체 각도 계산
      console.log(exer);
      let idx = 0;
      if(exer.exname == "사이드 런지 왼쪽"){
        idx = 1;
      }
      else if(exer.exname == "사이드 런지 오른쪽"){
        idx = 2;
      }
      else if(exer.exname == "숄더 프레스"){
        idx = 3;
      }
      const inputX = exer.x, inputY = exer.y;
      //왼쪽 허리 부분 (상체-하체)
      userAngle[idx].angle[0] = (Math.abs(Math.atan2(inputY[13] - inputY[11], inputX[13] - inputX[11])) + Math.abs(Math.atan2(inputY[5] - inputY[11], inputX[5] - inputX[11]))) * (180 / Math.PI);
      //오른쪽 허리 부분 (상체-하체)
      userAngle[idx].angle[1] = 360 - (Math.abs(Math.atan2(inputY[14] - inputY[12], inputX[14] - inputX[12])) + Math.abs(Math.atan2(inputY[6] - inputY[12], inputX[6] - inputX[12]))) * (180 / Math.PI);
      //왼쪽 상체 팔(겨드랑이 부분)
      userAngle[idx].angle[2] = (Math.abs(Math.atan2(inputY[11] - inputY[5], inputX[11] - inputX[5])) + Math.abs(Math.atan2(inputY[7] - inputY[5], inputX[7] - inputX[5]))) * (180 / Math.PI);
      //오른쪽 상체 팔(겨드랑이 부분)
      userAngle[idx].angle[3] = 360 - (Math.abs(Math.atan2(inputY[8] - inputY[6], inputX[8] - inputX[6])) + Math.abs(Math.atan2(inputY[12] - inputY[6], inputX[12] - inputX[6]))) * (180 / Math.PI);
      //왼쪽 팔꿈치
      userAngle[idx].angle[4] = (Math.abs(Math.atan2(inputY[9] - inputY[7], inputX[9] - inputX[7])) + Math.abs(Math.atan2(inputY[5] - inputY[7], inputX[5] - inputX[7]))) * (180 / Math.PI);
      //오른쪽 팔꿈치 
      userAngle[idx].angle[5] = 360 - (Math.abs(Math.atan2(inputY[10] - inputY[8], inputX[10] - inputX[8])) + Math.abs(Math.atan2(inputY[6] - inputY[8], inputX[6] - inputX[8]))) * (180 / Math.PI);
      //왼쪽 무릎
      userAngle[idx].angle[6] = (Math.abs((Math.atan2(inputY[15] - inputY[13], inputX[15] - inputX[13])) + Math.abs(Math.atan2(inputY[11] - inputY[13], inputX[11] - inputX[13])))) * (180 / Math.PI);
      //오른쪽 무릎
      userAngle[idx].angle[7] = 360 - (Math.abs((Math.atan2(inputY[16] - inputY[14], inputX[16] - inputX[14])) + Math.abs(Math.atan2(inputY[12] - inputY[14], inputX[12] - inputX[14])))) * (180 / Math.PI);
    };

    useEffect(() => {
      console.log(analysis);
        analysis.map(exer => {
          angle(exer);
        });
        console.log(userAngle);
      setTimeout(()=>{
     //   setShowResults(true);
      }, 4000);
    }, [])

  return (
    <Wrapper> 
      <div id="checkcon">
      {showResults && 
      <Animated>운동한 시간 : {hours}시간 {minutes}분 {seconds}초</Animated>}<br/><br/> 
      {showResults&&<Animated>운동을 다시 진행하시려면 다시하기 버튼을,<br/>끝내시려면 끝내기 버튼을 눌러주세요.</Animated> }
    </div>
      <Loading>
        {!showResults && <LoadingBar done={100}/>}  
      </Loading>

    </Wrapper>
  )
};


export default Check;