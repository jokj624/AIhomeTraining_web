import React, { useEffect, useState } from 'react';
import {Animated} from "react-animated-css";
import styled from 'styled-components';
import image1 from '../../img/lunge.jpeg';
import image2 from '../../img/tree.png';
import image3 from '../../img/shoulder1_after.jpg';
//import './First.css';  css 이거 키면 이상해짐..

const Wrapper = styled.div`
font-size : 16px;
text-align: center;
position:absolute;
top:50%; left:50%;
transform: translate(-50%, -50%);
`;
const Spacer = styled.div`
  height: 1.5rem;
  `;

const First = () => {

       const [timeover, setTimeover] = useState(false);
       const [visible, setVisible] = useState(true);
       const [pose, setPose] = useState(0);
       const image = [image1, image2, image3];
       let time1=0;
       let menus = ["안녕하세요", "운동을 시작해보겠습니다.", "우리가 할 운동은 다음과 같이 3가지 입니다."];
        let menuList = menus.map((menu) => {
            time1 = time1 + 1000;
            return <Animated animationIn="fadeIn" animationInDelay={time1} animationOut="fadeOut" animationOutDelay={2000} isVisible={visible}>{menu}</Animated>
        });
       /* const s = [image1, image2, image3];
        const sList = s.map((exercise) => {
            return <Animated animationIn="fadeIn" animationInDelay={1000}>{exercise}</Animated>
        });
*/
        const remove = () => {
            setTimeover(true);
        }
        const isvisible = () => {
            setVisible(false);
        }
    
     useEffect(() => {
        setTimeout(isvisible, 5000);
        setTimeout(remove, 8000);
     }, []);

     const nextPose = () => {
        if (pose === 0)
            setPose(1);
        else if (pose === 1)
            setPose(2);
        else
            setPose(0);
     };

     const beforePose = () => {
         if (pose === 1)
            setPose(0);
        else if (pose === 2)
            setPose(1);
        else
            setPose(2); 
     }

    return (
        <>
        
        {!timeover && <Wrapper>{menuList}<br/><Animated animationIn="fadeIn" animationInDelay={4000} animationOut="fadeOut" animationOutDelay={2000} isVisible={visible}><li>스쿼트</li><li>런지</li><li>숄더프레스</li></Animated> </Wrapper>}
        {timeover && <Animated>운동자세<Spacer/></Animated>}
        {(timeover && pose === 0) && <Animated><img src={image[0]}/><span id="posetext">스쿼트<br/>dlxs</span></Animated>}
        {(timeover && pose === 1) && <Animated><img src={image[1]}/>런지</Animated>}
        {(timeover && pose === 2) && <Animated><img src={image[2]}/>숄더프레스</Animated>}
        {timeover && <div id="pose"><div onClick={beforePose}>&gt; 이전 동작 보기</div><div onClick={nextPose}>&gt; 다음 동작 보기</div></div>}
        </>
    );
};

export default First;