import React, {useEffect, useState} from "react";
import Sketch from "react-p5";
import ml5 from "ml5";


/*
export function* displayState(){
    setLabels(labels);
    const [labels, setLabels] = useState('분석 중');
    console.log(labels);

}
*/

const Test = ({ displayState }) => {
    let video, poseNet, brain, pose, skeleton, poseLabel = '테스트 중!!', state = 'waiting';

    const setup = (p5, canvasParentRef) => {
		p5.createCanvas(960, 600).parent(canvasParentRef);
        video = p5.createCapture(p5.VIDEO);
        video.size(960,600);
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
            model:"https://smlistener.s3.ap-northeast-2.amazonaws.com/model_0216/15sec/loss_0.01/model.json",
            metadata : "https://smlistener.s3.ap-northeast-2.amazonaws.com/model_0216/15sec/loss_0.01/model_meta.json",
            weights: "https://smlistener.s3.ap-northeast-2.amazonaws.com/model_0216/15sec/loss_0.01/model.weights.bin"
          };
         brain.load(modelInfo, brainLoaded);
	};
    
	const draw = (p5) => {
        p5.translate(p5.width, 0);
        p5.scale(-1, 1);
        p5.image(video, 0, 0, p5.width, p5.height);
    
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
        p5.textSize(100);
        p5.fill(200, 200, 100);
        p5.text(poseLabel, 400, 200);
        //displayState(poseLabel);
	};
    const gotPoses = (poses) => {
        if(poses.length > 0){
          pose = poses[0].pose;
          skeleton = poses[0].skeleton;
          for(let i =0; i<pose.keypoints.length; i++){
              let x = pose.keypoints[i].position.x;
              let y = pose.keypoints[i].position.y;
            }
        }
        
    };
    const brainLoaded = () => {
        console.log('classification ready!');
        classifyPose();
    };
    const classifyPose = () => {
        detectPose();
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
        console.log(results);
        if(err){
            console.log(err);
            return;
        }
        if(results && (results[0].confidence > 0.8)){
            let la = results[0].label;
            if(la == '0')   poseLabel = '분석 중';
            else if(la == '1')  poseLabel = '스쿼트';
            else if(la == '2')  poseLabel = '런지';
            else if(la == '3')  poseLabel = '런지';
            else if(la == '4')  poseLabel = '숄더프레스 전';
            else if(la == '5')  poseLabel = '숄더프레스 후';
            else if(la == '6')  poseLabel = '나무 자세';
          }
          else  poseLabel = '분석 중';
          displayState(poseLabel);
          //console.log(poseLabel);
          classifyPose();
    };

    //displayState(poseLabel);
   return <Sketch setup={setup} draw={draw} />;
};
export default Test;