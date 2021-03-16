import React, { useEffect } from "react";
import Sketch from "react-p5";
import ml5 from "ml5";
import styled from 'styled-components';
import {Animated} from "react-animated-css";
import './Test.css';

const LabelBlock = styled.div`
    font-size : 3em;
    text-align : center;
    font-weight: bold;
    padding: 1rem;

`;
const Spacer = styled.div`
    height: 4rem;
`;

const Wrapper = styled.div`
    position: relative;
    text-align: center;
`;  

const Test = ({getData, squatCount, lungeCount, shoulderCount, seconds, minutes, hours}) => {
    let video, poseNet, brain, pose, skeleton,state = 'waiting';
    let squat = 0, lungeL = 0, lungeR = 0, press = 0, tree = 0, ck = 0;  //운동 횟수 변수
    let squatCk = 0, lungeLCk = 0, lungeRCk = 0, pressCk = 0, treeCk = 0; // 각 운동 종료 여부 확인 변수
    let poseLabel = '분석 중';
    let timer, timeover;
    const ww = window.innerWidth*0.7;
    const wh = window.innerHeight*0.7;

    let analysis = [
        {
            exname: "스쿼트",
            x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            exname: "사이드 런지 왼쪽",
            x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            exname: "사이드 런지 오른쪽",
            x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            exname: "숄더프레스",
            x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            exname: "나무 자세",
            x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }
    ]
    useEffect(() => {
        myCustomRedrawAccordingToNewPropsHandler();
    }, []) //test

    const setup = (p5,  canvasParentRef) => {
        p5.createCanvas(window.innerWidth*0.7, window.innerHeight*0.7).parent(canvasParentRef);
        video = p5.createCapture(p5.VIDEO);
        video.size(window.innerWidth*0.7, window.innerHeight*0.7);
        video.hide();
        poseNet = ml5.poseNet(video);   //posenet 시작
        poseNet.on('pose',gotPoses);
        const options = {
            inputs: 34,
            outputs: 7,
            task: 'classification',
            debug: true
        };
        brain = ml5.neuralNetwork(options);  //ml5 neuralNetwork 시작
        const modelInfo = {
            model:"https://smlistener.s3.ap-northeast-2.amazonaws.com/model_0307/lr_0.02_epoch50_2/model.json",
            metadata : "https://smlistener.s3.ap-northeast-2.amazonaws.com/model_0307/lr_0.02_epoch50_2/model_meta.json",
            weights: "https://smlistener.s3.ap-northeast-2.amazonaws.com/model_0307/lr_0.02_epoch50_2/model.weights.bin"
          };  //model load
         brain.load(modelInfo, brainLoaded);
    };

    const draw = (p5) => {
        p5.translate(p5.width, 0);
        p5.scale(-1, 1);
        p5.image(video, 0, 0, window.innerWidth*0.7, window.innerHeight*0.7);
        if(pose){
            for(let i=0; i<skeleton.length; i++){
                let a = skeleton[i][0];
                let b = skeleton[i][1];
                p5.strokeWeight(2);
                p5.stroke(73, 161, 165);
                p5.line(a.position.x*(window.innerWidth*0.7/ww), a.position.y*(window.innerHeight*0.7/wh), b.position.x*(window.innerWidth*0.7/ww), b.position.y*(window.innerHeight*0.7/wh));
            }
            for(let i = 0; i<pose.keypoints.length; i++){
                let x = pose.keypoints[i].position.x*(window.innerWidth*0.7/ww);
                let y = pose.keypoints[i].position.y*(window.innerHeight*0.7/wh);
                p5.fill(0);
                p5.stroke(255);
                p5.ellipse(x,y,10,10); 
            }
        }
    };
    const windowResized = (p5) => {
        p5.resizeCanvas(window.innerWidth*0.7, window.innerHeight*0.7, true);
      };
    

    const myCustomRedrawAccordingToNewPropsHandler = () => {
        if(getData){
            getData(analysis);    //Exercise Container 로 전달
        }
    };

    const gotPoses = (poses, x, y) => {
        if(poses.length > 0){
          pose = poses[0].pose;
          skeleton = poses[0].skeleton;
          
          for(let i =0; i<pose.keypoints.length; i++){
              x = pose.keypoints[i].position.x;
              y = pose.keypoints[i].position.y;
            }
        
        }
    };
    const brainLoaded = () => {
        console.log('classification ready!');
        classifyPose();
    };
    const classifyPose = () => {
        detectPose();   //사람 카메라 안으로 들어왔는지 확인 하는 함수
        if(pose && (state == 'ready')){
            let inputs = [];
            for(let i =0; i<pose.keypoints.length; i++){
                let x = pose.keypoints[i].position.x;
                let y = pose.keypoints[i].position.y;
                inputs.push(x);
                inputs.push(y);
            }
            brain.classify(inputs, gotResult);   
        } else{
            setTimeout(classifyPose, 100);  //pose 없으면 대기 후 다시 
          }
    };
    const detectPose = () => {
        state = 'waiting'
        if (pose) {
          let nose = pose.keypoints[0].score;
          let ankleR = pose.keypoints[14].score;
          if ((nose > 0.5) && (ankleR > 0.5)) {
            state = 'ready';
          } else {
            state = 'waiting';
          }
        }
    };
    const gotResult = (err, results) => {
        //console.log(results);
        if(err){
            console.log(err);
            return;
        }
        if(results && (results[0].confidence > 0.5)){
            let la = results[0].label;
            if(la == '0')    poseLabel = '분석 중';
            else if(la == '1')  poseLabel = '스쿼트';
            else if(la == '2')  poseLabel = '런지 왼쪽';
            else if(la == '3')  poseLabel = '런지 오른쪽';
            else if(la == '4')  poseLabel = '숄더프레스';
            else if(la == '5')  poseLabel = '나무 자세';
          }
          else  poseLabel = '분석 중';
          if(poseLabel == '분석 중'){
              ck = 0;
              if(tree>0 && !treeCk){        //나무 자세 시간 종료 전에 멈추면 다시 시작하라고 알림
                  clearInterval(timer);
                  clearTimeout(timeover);
                  document.getElementById("test").innerHTML = "나무 자세 다시 시작 하세요";
              }
          } 
          else {
            inputLabel(poseLabel);    //라벨, 횟수 화면에 보여주는
          }
          console.log(poseLabel);
          classifyPose();
    };

    const save = (index, isTree) => {
        //현재 자세 좌표 저장하는 함수
        //isTree == 1 => 나무 자세 좌표 (평균 낼 필요 없음)
        if(!isTree){    
            for(let i = 0; i<pose.keypoints.length; i++){
                let x = pose.keypoints[i].position.x;
                let y = pose.keypoints[i].position.y;
                if (index === 0) {
                    analysis[index].x[i] += (x/squatCount);
                    analysis[index].y[i] += (y/squatCount);
                }
                else if (index === 1) {
                    analysis[index].x[i] += (x/lungeCount);
                    analysis[index].y[i] += (y/lungeCount);
                }
                else if (index === 2) {
                    analysis[index].x[i] += (x/lungeCount);
                    analysis[index].y[i] += (y/lungeCount);
                }
                else {
                    analysis[index].x[i] += (x/shoulderCount);
                    analysis[index].y[i] += (y/shoulderCount);
                }
                console.log(index);
                console.log(analysis);
            }
        }    
        else{
            for(let i = 0; i<pose.keypoints.length; i++){
                let x = pose.keypoints[i].position.x;
                let y = pose.keypoints[i].position.y;
                analysis[index].x[i] += x;
                analysis[index].y[i] += y;   
            }
        }
    };

    let inputLabel = (label) => {    // 운동 횟수 세기 + 라벨 작성 함수
        if(label == '스쿼트' && !ck && squat < squatCount){
            save(0, 0);  // 현재 좌표 저장
            squat += 1;
            document.getElementById("test").innerHTML = `${label}`+ " " + `${squat}` + "회";
            ck = 1;
            if(squat == squatCount && !squatCk){
                document.getElementById("test").innerHTML = "사이드 런지 왼쪽 시작하세요";
                squatCk = 1;
            }
        }  // 스쿼트 개수 세기 (임의로 3개로 해둠)
        else if(label == '런지 왼쪽' && !ck && lungeL < lungeCount && squatCk==1){
            save(1, 0);
            lungeL += 1;
            document.getElementById("test").innerHTML = `${label}`+ " " + `${lungeL}` + "회";
            ck = 1;
            if(lungeL == lungeCount && !lungeLCk){
                document.getElementById("test").innerHTML = "사이드 런지 오른쪽 시작하세요";
                lungeLCk = 1;
            }
        }
        else if(label == '런지 오른쪽' && !ck && lungeR < lungeCount && lungeL >= lungeCount && lungeLCk == 1){
            save(2, 0);
            lungeR += 1;
            document.getElementById("test").innerHTML = `${label}` + " " + `${lungeR}` + "회";
            ck = 1;
            if(lungeR == lungeCount && !lungeRCk){
                document.getElementById("test").innerHTML = "숄더프레스 시작하세요";
                lungeRCk = 1;
            }
        }
        else if(label == '숄더프레스' && !ck && press < shoulderCount && lungeRCk == 1){
            save(3, 0);
            press += 1;
            document.getElementById("test").innerHTML = `${label}` + " " + `${press}` + "회";
            ck = 1;
            if(press == shoulderCount && !pressCk){
                document.getElementById("test").innerHTML = "나무 자세 시작하세요";
                pressCk = 1; 
            }
        }
        else if(label == '나무 자세' && !ck && pressCk == 1){
            tree += 1;
            ck = 1;   
            if(!treeCk){
                let sec = 15;
                timer = setInterval(() => {
                    if(sec == 2)    save(4, 1);     //종료 직전에 좌표 저장
                    document.getElementById("test").innerHTML = `${label}` + " " + `${sec--}` + "초 남았습니다.";
                }, 1000);   //1초마다 반복

                timeover = setTimeout(()=>{
                    clearInterval(timer);
                    treeCk = 1;
                    document.getElementById("test").innerHTML = "운동 종료";
                    myCustomRedrawAccordingToNewPropsHandler();   //Exercise Container 로 analysis 배열 전달하는 함수
                }, 16000);      //1초 더 많이 해야 잘 맞음
            }
        }
    };

   return (
    <>
    <Wrapper>
    <Animated animationIn="fadeIn"><LabelBlock id='test'>스쿼트를 시작하세요</LabelBlock></Animated>
      <Sketch setup={setup} draw={draw} windowResized={windowResized}/>
    </Wrapper>
    </>
   )
};
export default Test;