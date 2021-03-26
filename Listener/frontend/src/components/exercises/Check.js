import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {Animated} from "react-animated-css";
import LoadingBar from '../common/LoadingBar';
import Responsive from '../common/Responsive';
import ExerciseResult from './ExerciseResult';

const Wrapper1 = styled.div`
  position:relative;
  text-align: center;
`;

const Wrapper2 = styled.div`
height : 500px;
  position:relative;
  text-align: center;
`;

const Loading = styled(Responsive)`
    display: flex;
    width: 100%;
    align-items: center;

`;

const Spacer = styled.div`
  height: 5rem;
  `;

const Check = ({analysis, cntArr}) => {
    const [showResults, setShowResults] = useState(false);
    const [trainerAngle, setTrainer] = useState([]);
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    let existS=1, existL=1, existP=1;
    let mistakes = [   
      {
        squat: [],
        lungeL: [],
        lungeR: [],
        press: [],
        tree: []
      }
    ]
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
      userAngle[idx].angle.push((Math.abs(Math.atan2(inputY[13] - inputY[11], inputX[13] - inputX[11])) + Math.abs(Math.atan2(inputY[5] - inputY[11], inputX[5] - inputX[11]))) * (180 / Math.PI));
      //오른쪽 허리 부분 (상체-하체)
      userAngle[idx].angle.push(360 - (Math.abs(Math.atan2(inputY[14] - inputY[12], inputX[14] - inputX[12])) + Math.abs(Math.atan2(inputY[6] - inputY[12], inputX[6] - inputX[12]))) * (180 / Math.PI));
      //왼쪽 상체 팔(겨드랑이 부분)
      userAngle[idx].angle.push((Math.abs(Math.atan2(inputY[11] - inputY[5], inputX[11] - inputX[5])) + Math.abs(Math.atan2(inputY[7] - inputY[5], inputX[7] - inputX[5]))) * (180 / Math.PI));
      //오른쪽 상체 팔(겨드랑이 부분)
      userAngle[idx].angle.push(360 - (Math.abs(Math.atan2(inputY[8] - inputY[6], inputX[8] - inputX[6])) + Math.abs(Math.atan2(inputY[12] - inputY[6], inputX[12] - inputX[6]))) * (180 / Math.PI));
      //왼쪽 팔꿈치
      userAngle[idx].angle.push((Math.abs(Math.atan2(inputY[9] - inputY[7], inputX[9] - inputX[7])) + Math.abs(Math.atan2(inputY[5] - inputY[7], inputX[5] - inputX[7]))) * (180 / Math.PI));
      //오른쪽 팔꿈치 
      userAngle[idx].angle.push(360 - (Math.abs(Math.atan2(inputY[10] - inputY[8], inputX[10] - inputX[8])) + Math.abs(Math.atan2(inputY[6] - inputY[8], inputX[6] - inputX[8]))) * (180 / Math.PI));
      //왼쪽 무릎
      userAngle[idx].angle.push((Math.abs((Math.atan2(inputY[15] - inputY[13], inputX[15] - inputX[13])) + Math.abs(Math.atan2(inputY[11] - inputY[13], inputX[11] - inputX[13])))) * (180 / Math.PI));
      //오른쪽 무릎
      userAngle[idx].angle.push(360 - (Math.abs((Math.atan2(inputY[16] - inputY[14], inputX[16] - inputX[14])) + Math.abs(Math.atan2(inputY[12] - inputY[14], inputX[12] - inputX[14])))) * (180 / Math.PI));

     
      if(idx == 4){
        calculateAngle();
      }
    };

    const calculateAngle = () => {
       //자세 분석 결과 저장
      cntArr.map(item => {
        if(item == 0) {
          existS = 0;
        } else if(item == 1 || item == 2){
          existL = 0;
        } else if(item == 3)  {
          existP = 0;
        }
      });
      let cmp = 0.0; //각도 차
      let str = "";
      let squatms = [], lungeLms = [], lungeRms = [], pressms = [], treems = [];
      if(existS){
        if(userAngle[0].angle[0] == 0){
          str = "운동을 진행해주세요";
          squatms.push(str);
        } else {     //스쿼트
          cmp = (360-trainerAngle[0]["0"]) - (360-userAngle[0].angle[0]);   //스쿼트 허리 계산
          if(cmp > 15){
            str = "상체를 조금 더 세우세요";
            squatms.push(str);
          } 
          else if(cmp < -15){
            str = "상체를 조금 더 굽히세요";
            squatms.push(str);
          } 
          cmp = trainerAngle[0]["6"] - userAngle[0].angle[6]; //스쿼트 무릎 계산
          if(cmp > 15){
            str = "엉덩이를 조금 더 드세요";
            squatms.push(str);
          }
          else if(cmp < -15){
            str = "엉덩이를 조금 더 내리세요";
            squatms.push(str);
          }
        }
      } else {
        str = '생략한 운동입니다';
        squatms.push(str);
      }
      if(existL){
        if(userAngle[1].angle[6] == 0){
          str = "운동을 진행해주세요";
          lungeLms.push(str);
        } else {
          //사이드 런지 왼쪽
          cmp = (360-trainerAngle[1]["6"]) - (360-userAngle[1].angle[6]);  //런지 왼쪽 무릎
          if(cmp < -15){
            str = "왼쪽 무릎을 조금 더 굽히세요";
            lungeLms.push(str);
          } 
          cmp = (360-trainerAngle[1]["7"]) - (360-userAngle[1].angle[7]);   /// 런지 오른쪽 무릎
          if(cmp > 15 || cmp < -15){
            str = "오른쪽 무릎을 조금 더 피세요";
            lungeLms.push(str);
          }
        }
        if(userAngle[2].angle[6] == 0){
          str = "운동을 진행해주세요";
          lungeRms.push(str);
        } else {
          //사이드 런지 오른쪽
          cmp = (360-trainerAngle[2]["6"]) - (360-userAngle[2].angle[6]);  //런지 왼쪽 무릎
          if(cmp > 15 || cmp < -15){
            str = "왼쪽 무릎을 조금 더 피세요";
            lungeRms.push(str);
          }
          cmp = (360-trainerAngle[2]["7"]) - (360-userAngle[2].angle[7]);   //런지 오른쪽 무릎
          if(cmp < -15){
            str = "오른쪽 무릎을 조금 더 굽히세요";
            lungeRms.push(str);
          }
        }
      } else {
        str = '생략한 운동입니다';
        lungeLms.push(str);
        lungeRms.push(str);
      }

      if(existP){
        if(userAngle[3].angle[3] == 360){
          str = "운동을 진행해주세요";
          pressms.push(str);
        } else {
          //숄더 프레스
          cmp = trainerAngle[3]["3"] - userAngle[3].angle[3];  //프레스 오른쪽 겨드랑이
          if(cmp > 15){
            str = "오른쪽 팔을 더 올리세요";
            pressms.push(str);
          }
          cmp = trainerAngle[3]["2"] - userAngle[3].angle[2];  //프레스 왼쪽 겨드랑이
          if(cmp > 15){
            str = "왼쪽 팔을 더 올리세요";
            pressms.push(str);
          }
          cmp = (360-trainerAngle[3]["5"]) - (360-userAngle[3].angle[5]);   //프레스 오른쪽 팔꿈치
          if(cmp > 15){
            str = "오른쪽 팔을 더 피세요";
            pressms.push(str);
          }
          cmp = (360-trainerAngle[3]["4"]) - (360-userAngle[3].angle[4]);   //프레스 왼쪽 팔꿈치
          if(cmp > 15){
            str = "왼쪽 팔을 더 피세요";
            pressms.push(str);
          }
        }
      } else {
        str = '생략한 운동입니다';
        pressms.push(str);
      }
      if(userAngle[4].angle[1] == 360){
        str = "운동을 진행해주세요";
        treems.push(str);
      } else {
        //나무 자세
        cmp = trainerAngle[4]["1"] - userAngle[4].angle[1];   //나무자세 오른쪽 허리
        if(cmp < -10){
          str = "상체를 조금 더 세우세요";
          treems.push(str);
        }
        cmp = (360-trainerAngle[4]["7"]) - (360-userAngle[4].angle[7]);   //나무자세 오른쪽 무릎  
        if(cmp < -10){
          str = "오른쪽 무릎을 위로 더 굽히세요";
          treems.push(str);
        }
      }
      
      mistakes[0].squat = squatms;
      mistakes[0].lungeL = lungeLms;
      mistakes[0].lungeR = lungeRms;
      mistakes[0].press = pressms;
      mistakes[0].tree = treems;
      setResult(mistakes);
      setTimeout(()=> {
        setShowResults(true);
      }, 3000);
    }

    useEffect(() => {
        fetch(`https://smlistener.s3.ap-northeast-2.amazonaws.com/json/new_trainer_angle.json`)
        .then(results => results.json())
        .then(json => {
           setTrainer(json);
           setLoading(true);
        })
    }, [])   
    
    useEffect(() => {
      if(loading){
        analysis.map(exer => {
          angle(exer);
        });
      }
    }, [loading])

    
  return (
    <>
    {showResults && <Wrapper1> 
      <Spacer/>
      <Animated><ExerciseResult mistakes = {result} /> </Animated>
    </Wrapper1>}
    {!showResults &&<Wrapper2>
      <Loading>
         <LoadingBar done={100}/>
      </Loading>
      </Wrapper2>}  
      </>
  )
};


export default Check;