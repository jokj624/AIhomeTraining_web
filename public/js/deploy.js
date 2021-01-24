
let video;
let poseNet;
let pose;
let skeleton;

let brain;
let poseLabel = 'S';
let state = 'waiting';
let targetLabel;   

function keyPressed(){
    if(key == 's'){
        brain.saveData();
    }else{ 
    targetLabel = key;  //target label 은 누르는 키로 저장 
    console.log(targetLabel);
    setTimeout(function(){
        console.log('collecting');   
        state = 'collecting';
        setTimeout(function(){
            console.log('not collecting');
            state = 'waiting';
        }, 10000);
    }, 10000); 
  }  //키 누르면 10초 뒤에 시작 
} 
function setup(){
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);

    let options = {
        intputs: 34,
        outputs: 6,  //운동 개수로 해야함
        task: 'classification',
        debug: true
    }
    brain = ml5.neuralNetwork(options);
    const modelInfo = {
        model : './model/model.json',
        metadata : './model/model_meta.json',
        weights: './model/model.weights.bin',
    };
    brain.load(modelInfo, brainLoaded);   //model load
}
function brainLoaded(){
    console.log('pose classification ready!');
    classifyPose();
}
function classifyPose(){
    if(pose){
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
}

function gotResult(error, results){
    let la = results[0].label;
    if(la == '0')     poseLabel = 'S';
    else if(la == '1')    poseLabel = 'E';
    else if(la == '2')    poseLabel = 'P'
    else if(la == '3')    poseLabel = 'L';
    else if(la == '4')    poseLabel = 'R';
    else if(la == '5')    poseLabel = 'T';   //pose classify
    console.log(results[0].confidence);
    classifyPose();
}

function dataReady(){
    brain.normalizeData();
    brain.train({epochs : 50}, finished);
}
function finished(){
    console.log('model trained');
    brain.save();
}
function gotPoses(poses){
    if(poses.length > 0){
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
        if(state == 'collecting'){
            let inputs = [];
            for(let i =0; i<pose.keypoints.length; i++){
                let x = pose.keypoints[i].position.x;
                let y = pose.keypoints[i].position.y;
                inputs.push(x);
                inputs.push(y);
            }
            let target = [targetLabel];
            brain.addData(inputs, target);
        }
    }
}
function modelLoaded(){
    console.log('poseNet ready');
}

function draw(){
    push();
    translate(video.width, 0);
    scale(-1, 1);
    image(video, 0, 0, video.width, video.height);

    if(pose){
        for(let i=0; i<skeleton.length; i++){
            let a = skeleton[i][0];
            let b = skeleton[i][1];   
            strokeWeight(2);
            stroke(73, 161, 165); 
            line(a.position.x, a.position.y, b.position.x, b.position.y);
        }
        for(let i = 0; i<pose.keypoints.length; i++){
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;
            fill(0);
            stroke(255);
            ellipse(x,y,10,10);
        }
    }
    pop();
    fill(255,0,255);
    noStroke();
    textSize(250);
    textAlign(CENTER, CENTER);
    text(poseLabel, width/2, height/2);
}