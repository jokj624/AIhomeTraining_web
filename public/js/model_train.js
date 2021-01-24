let video;
let poseNet;
let pose;
let skeleton;

let brain;

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
    brain.loadData('./train_data.json', dataReady);    //train data load
}
function dataReady(){
    brain.normalizeData();   //정규화
    brain.train({epochs : 50}, finished);       //이폭 50 
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
}