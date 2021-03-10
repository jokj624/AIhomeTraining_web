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
    const [trainerAngle, setTrainer] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(({ user }) => ({
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
      },
      {
        exname: "나무 자세",
        angle: []
      }
    ];
    //자세 분석 결과 저장
    let mistakes = [   
      {
        squat: [],
        lungeL: [],
        lungeR: [],
        press: [],
        tree: []
      }
    ]
    const hours = parseInt(user.s/60/60);
    const minutes = parseInt(user.s%(60*60)/60);
    const seconds = parseInt(user.s%60);

    const angle = (exer) => {   //user의 좌표로 8개의 인체 각도 계산
      let idx = 0;
      if(exer.exname == "사이드 런지 왼쪽"){
        idx = 1;
      }
      else if(exer.exname == "사이드 런지 오른쪽"){
        idx = 2;
      }
      else if(exer.exname == "숄더프레스"){
        idx = 3;
      }
      else if(exer.exname == "나무 자세"){
        idx = 4;
      }
      const inputX = exer.x, inputY = exer.y;
      //왼쪽 허리 부분 (상체-하체)
      userAngle[idx].angle[0] += (Math.abs(Math.atan2(inputY[13] - inputY[11], inputX[13] - inputX[11])) + Math.abs(Math.atan2(inputY[5] - inputY[11], inputX[5] - inputX[11]))) * (180 / Math.PI);
      console.log(userAngle[idx].angle[0][0]);
      //오른쪽 허리 부분 (상체-하체)
      userAngle[idx].angle[1] += 360 - (Math.abs(Math.atan2(inputY[14] - inputY[12], inputX[14] - inputX[12])) + Math.abs(Math.atan2(inputY[6] - inputY[12], inputX[6] - inputX[12]))) * (180 / Math.PI);
      //왼쪽 상체 팔(겨드랑이 부분)
      userAngle[idx].angle[2] += (Math.abs(Math.atan2(inputY[11] - inputY[5], inputX[11] - inputX[5])) + Math.abs(Math.atan2(inputY[7] - inputY[5], inputX[7] - inputX[5]))) * (180 / Math.PI);
      //오른쪽 상체 팔(겨드랑이 부분)
      userAngle[idx].angle[3] += 360 - (Math.abs(Math.atan2(inputY[8] - inputY[6], inputX[8] - inputX[6])) + Math.abs(Math.atan2(inputY[12] - inputY[6], inputX[12] - inputX[6]))) * (180 / Math.PI);
      //왼쪽 팔꿈치
      userAngle[idx].angle[4] += (Math.abs(Math.atan2(inputY[9] - inputY[7], inputX[9] - inputX[7])) + Math.abs(Math.atan2(inputY[5] - inputY[7], inputX[5] - inputX[7]))) * (180 / Math.PI);
      //오른쪽 팔꿈치 
      userAngle[idx].angle[5] += 360 - (Math.abs(Math.atan2(inputY[10] - inputY[8], inputX[10] - inputX[8])) + Math.abs(Math.atan2(inputY[6] - inputY[8], inputX[6] - inputX[8]))) * (180 / Math.PI);
      //왼쪽 무릎
      userAngle[idx].angle[6] += (Math.abs((Math.atan2(inputY[15] - inputY[13], inputX[15] - inputX[13])) + Math.abs(Math.atan2(inputY[11] - inputY[13], inputX[11] - inputX[13])))) * (180 / Math.PI);
      //오른쪽 무릎
      userAngle[idx].angle[7] += 360 - (Math.abs((Math.atan2(inputY[16] - inputY[14], inputX[16] - inputX[14])) + Math.abs(Math.atan2(inputY[12] - inputY[14], inputX[12] - inputX[14])))) * (180 / Math.PI);
    };

    const calculateAngle = () => {
      let cmp = 0.0; //각도 차
      let str = "";
      let squatms = [], lungeLms = [], lungeRms = [], pressms = [], treems = [];
      //스쿼트
      cmp = parseFloat(trainerAngle[0]["0"]) - userAngle[0].angle[0];   //스쿼트 허리 계산
      console.log(userAngle[0].angle);
      if(cmp > 10){
        str = "상체를 조금 더 세우세요";
        squatms.push(str);
      } 
      else if(cmp < -10){
        str = "상체를 조금 더 굽히세요";
        squatms.push(str);
      }
      
      cmp = trainerAngle[0]["6"] - userAngle[0].angle[6]; //스쿼트 무릎 계산
      if(cmp > 10){
        str = "엉덩이를 조금 더 드세요";
        squatms.push(str);
      }
      else if(cmp < -10){
        str = "엉덩이를 조금 더 내리세요";
        squatms.push(str);
      }
      //사이드 런지 왼쪽
      cmp = trainerAngle[1]["6"] - userAngle[1].angle[6];  //런지 왼쪽 무릎
      if(cmp < -10){
        str = "왼쪽 무릎을 조금 더 굽히세요";
        lungeLms.push(str);
      } 
      cmp = trainerAngle[1]["7"] - userAngle[1].angle[7];   /// 런지 오른쪽 무릎
      if(cmp > 10 || cmp < -10){
        str = "오른쪽 무릎을 조금 더 피세요";
        lungeLms.push(str);
      }

      //사이드 런지 오른쪽
      cmp = trainerAngle[2]["6"] - userAngle[2].angle[6];  //런지 왼쪽 무릎
      if(cmp > 10 || cmp < -10){
        str = "왼쪽 무릎을 조금 더 피세요";
        lungeRms.push(str);
      }
      cmp = trainerAngle[2]["7"] - userAngle[2].angle[7];   //런지 오른쪽 무릎
      if(cmp < -10){
        str = "오른쪽 무릎을 조금 더 굽히세요";
        lungeRms.push(str);
      }

      //숄더 프레스
      cmp = trainerAngle[3]["3"] - userAngle[3].angle[3];  //프레스 오른쪽 겨드랑이
      if(cmp > 10){
        str = "오른쪽 팔을 더 올리세요";
        pressms.push(str);
      }
      cmp = trainerAngle[3]["2"] - userAngle[3].angle[2];  //프레스 왼쪽 겨드랑이
      if(cmp > 10){
        str = "왼쪽 팔을 더 올리세요";
        pressms.push(str);
      }
      cmp = trainerAngle[3]["5"] - userAngle[3].angle[5];   //프레스 오른쪽 팔꿈치
      if(cmp > 10){
        str = "오른쪽 팔을 더 피세요";
        pressms.push(str);
      }
      cmp = trainerAngle[3]["4"] - userAngle[3].angle[4];   //프레스 왼쪽 팔꿈치
      if(cmp > 10){
        str = "왼쪽 팔을 더 피세요";
        pressms.push(str);
      }

      //나무 자세
      cmp = trainerAngle[4]["1"] - userAngle[4].angle[1];   //나무자세 오른쪽 허리
      if(cmp < -10){
        str = "오른쪽 다리를 더 올리세요";
        treems.push(str);
      }
      cmp = trainerAngle[4]["7"] - userAngle[4].angle[7];   //나무자세 오른쪽 무릎
      if(cmp < -10){
        str = "오른쪽 무릎을 위로 더 굽히세요";
        treems.push(str);
      }
      mistakes[0].squat = squatms;
      mistakes[0].lungeL = lungeLms;
      mistakes[0].lungeR = lungeRms;
      mistakes[0].press = pressms;
      mistakes[0].tree = treems;
    }

    useEffect(() => {
        console.log(analysis);
        fetch(`https://smlistener.s3.ap-northeast-2.amazonaws.com/json/new_trainer_angle.json`)
        .then(results => results.json())
        .then(json => {
           setTrainer(json);
           setLoading(true);
        }).then(() => {
            analysis.map(exer => {
              angle(exer);
          });
        });
        console.log(userAngle);
        
      setTimeout(()=>{
     //   setShowResults(true);
      }, 4000);
    }, [])   
    
    useEffect(() => {
      if(loading){
        calculateAngle();
        console.log(mistakes);
      }
    }, [loading])

    

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