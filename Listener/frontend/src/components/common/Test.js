import Sketch from "react-p5";
import React from "react";


const Test = () => {
    let x = 50;
	let y = 50;
    const setup = (p5, canvasParentRef) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		p5.createCanvas(500, 500).parent(canvasParentRef);
	};
    
	const draw = (p5) => {
		p5.background(0);
		p5.ellipse(x, y, 70, 70);
		// NOTE: Do not use setState in the draw function or in functions that are executed
		// in the draw function...
		// please use normal variables or class properties for these purposes
		x++;
	};
    /*
    const Sketch = p5 => {
        let video, poseNet, pose, skeleton;
        p5.setup = () =>{
            p5.createCanvas(960, 600);
            video = p5.createCapture(p5.VIDEO); 
            video.size(960,600);
            //video.hide();
            //poseNet = ml5.poseNet(video, p5.modelLoaded);
            //poseNet.on('pose',p5.gotPoses);
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
        
        ​
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
    /*useEffect(() => {
        new p5(Sketch);
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    */
   return <Sketch setup={setup} draw={draw} />;
};
export default Test;