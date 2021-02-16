import React, { useState } from 'react';
import ml5 from "ml5";

const Sketch = (p5, props) => {
 // const [poseLabel, setLabel] = useState('분석 중');
  let video, poseNet, pose, skeleton, brain, poseLabel = '분석 중', state = 'waiting';

  p5.setup = () => {
    p5.createCanvas(960, 600);
    video = p5.createCapture(p5.VIDEO);
    video.size(960,600);
    video.hide();
    poseNet = ml5.poseNet(video, p5.modelLoaded);
    poseNet.on('pose',p5.gotPoses);
    const options = {
      inputs: 34,
      outputs: 6,
      task: 'classification',
      debug: true
    };
  brain = ml5.neuralNetwork(options);
  console.log(brain);
  const modelInfo = {
      model:"https://smlistener.s3.ap-northeast-2.amazonaws.com/model2/model.json",
      metadata : "https://smlistener.s3.ap-northeast-2.amazonaws.com/model2/model_meta.json",
      weights: "https://smlistener.s3.ap-northeast-2.amazonaws.com/model2/model.weights.bin"
    };
   brain.load(modelInfo, p5.brainLoaded);
  };
  p5.brainLoaded = () => {
    console.log('classification ready!');
    p5.classifyPose();
  };
  p5.detectPose = () => {
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
  }
  p5.classifyPose = () => {
    p5.detectPose();
    if(pose && (state == 'ready')){
      let inputs = [];
      for(let i =0; i<pose.keypoints.length; i++){
          let x = pose.keypoints[i].position.x;
          let y = pose.keypoints[i].position.y;
          inputs.push(x);
          inputs.push(y);
      }
      brain.classify(inputs, p5.gotResult);   
  } else{
      setTimeout(p5.classifyPose, 100);  //pose 없으면 대기 후 다시 
    }
  };

  p5.gotResult = (error, results) =>{
    console.log(results);
    
    /*if(results[0].confidence > 0.85){
      if(la === '0')   setLabel('스쿼트');
      else if(la === '1')  setLabel('숄더프레스 전');
      else if(la === '2')  setLabel('숄더프레스 후');
      else if(la === '3')  setLabel('런지');
      else if(la === '4')  setLabel('런지');
      else if(la === '5')  setLabel('나무 자세');
    }
    else  setLabel('분석 중');*/
   if(results && (results[0].confidence > 0.8)){
      let la = results[0].label;
      if(la == '0')   poseLabel = '숄더프레스 전';
      else if(la == '1')  poseLabel = '스쿼트';
      else if(la == '2')  poseLabel = '런지';
      else if(la == '3')  poseLabel = '런지';
      else if(la == '4')  poseLabel = '분석 중';
      else if(la == '5')  poseLabel = '숄더프레스 후';
      else if(la == '6')  poseLabel = '나무 자세';
    }
    else  poseLabel = '분석 중';
  //  displayState(poseLabel);
    console.log(poseLabel);
    p5.classifyPose();
  };

  p5.modelLoaded = () => {
    console.log('Model Loaded!');
  };
  
  p5.gotPoses = (poses) => {
    if(poses.length > 0){
      pose = poses[0].pose;
      skeleton = poses[0].skeleton;
      for(let i =0; i<pose.keypoints.length; i++){
          let x = pose.keypoints[i].position.x;
          let y = pose.keypoints[i].position.y;
        }
    }
  };
  
  p5.draw = () => {
    p5.translate(video.width, 0);
    p5.scale(-1, 1);
    p5.image(video, 0, 0, video.width, video.height);

    if(pose){
        for(let i=0; i<skeleton.length; i++){
            let a = skeleton[i][0];
            let b = skeleton[i][1];
            p5.strokeWeight(2);
            p5.stroke(73, 161, 165);
            p5.line(a.position.x, a.position.y, b.position.x, b.position.y);
        }
        for(let i = 0; i<pose.keypoints.length; i++){
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;
            p5.fill(0);
            p5.stroke(255);
            p5.ellipse(x,y,10,10); 
        }
    }
    
  };
};
export default Sketch;
