import React, { useEffect, useState } from 'react';
import {Animated} from "react-animated-css";
import styled from 'styled-components';
import image1 from '../../img/squat.gif';
import image2 from '../../img/lunge.gif';
import image3 from '../../img/shoulderpress.gif';
import './First.css'; //이거 키면 main 이상해져
import Button from '../../components/common/Button';
import palette from '../../lib/style/palette';

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

  const StyledButton = styled(Button)`
  background: ${palette.gray[5]};
  &:hover {
    background: ${palette.gray[3]};
  }
    font-size : 0.8rem;
    margin: 0.1rem;

`;

const First = () => {

       const [timeover, setTimeover] = useState(false);
       const [visible, setVisible] = useState(true);
       const [pose, setPose] = useState(0);
       let time1=0;
       let menus = ["안녕하세요", "운동을 시작해보겠습니다.", "우리가 할 운동은 다음과 같이 3가지 입니다."];
        let menuList = menus.map((menu) => {
            time1 = time1 + 1000;
            return <Animated animationIn="fadeIn" animationInDelay={time1} animationOut="fadeOut" animationOutDelay={2000} isVisible={visible}>{menu}</Animated>
        });
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

     const prePose = () => {
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
        <div id="ex">
            <span>
                {(timeover && pose === 0) && <Animated animationIn="fadeIn" animationInDelay={500}><img id="image" src={image1}/></Animated>}
                {(timeover && pose === 1) && <Animated animationIn="fadeIn" animationInDelay={500}><img id="image" src={image2}/></Animated>}
                {(timeover && pose === 2) && <Animated animationIn="fadeIn" animationInDelay={500}><img id="image" src={image3}/></Animated>}
            </span>
            <span id="posetext">
                {(timeover && pose === 0) && <Animated animationIn="fadeIn" animationInDelay={500}>
                    <div id="pose">SQUAT</div><br/>
                    <ol>
                        <li>카메라를 바라보는 방향을 기준으로 오른쪽으로 몸을 돌리고 섭니다.</li>
                        <li>두 손은 모은 상태를 유지합니다.</li>
                        <li>양발의 간격은 골반보다 조금 더 넓게 유지하고, 양발 끝은 바깥쪽으로 15도~20도 정도 벌려줍니다.</li>
                        <li>상체는 그대로 꼿꼿이 유지하면서 천천히 엉덩이를 뒤로 빼며 무릎을 굽혀 앉는 자세를 취합니다.</li>
                        <li>허벅지가 바닥과 평행이 되면 천천히 준비자세로 돌아옵니다.</li>
                    </ol>
                </Animated>}
                {(timeover && pose === 1) && <Animated animationIn="fadeIn" animationInDelay={500}>
                <div id="pose">SIDE LUNGE</div><br/>
                    <ol>
                        <li>카메라를 바라보는 방향으로 섭니다.</li>
                        <li>두 손은 모은 상태를 유지합니다.</li>
                        <li>양발의 간격이 어깨의 2배정도 되도록 벌려줍니다.</li>
                        <li>한쪽 방향으로 몸을 옮겨 체중을 실어주며 옮기는 쪽 다리에 대부분의 힘을 준 상태로 허리는 꼿꼿이 펴고 엉덩이를 뒤로 빼며 체중을 실은 쪽의 무릎을 굽혀줍니다.</li>
                        <li>굽힌 쪽의 허벅지가 바닥과 평행이 되면 천천히 준비자세로 돌아옵니다.</li>
                    </ol>
                </Animated>}
                {(timeover && pose === 2) && <Animated animationIn="fadeIn" animationInDelay={500}>
                <div id="pose">SHOULDER PRESS</div><br/>
                    <ol>
                        <li>카메라를 바라보는 방향으로 섭니다.</li>
                        <li>양발의 간격은 어깨너비로 벌립니다.</li>
                        <li>허리는 꼿꼿이 핀 상태를 유지합니다.</li>
                        <li>어깨 좌우 대칭을 유지하고, 손목과 팔꿈치가 일자를 이루도록 하며 팔을 완전히 위쪽으로 펴줍니다.</li>
                        <li>천천히 준비자세로 돌아옵니다.</li>
                    </ol>
                    </Animated>}
            </span>
        </div>
        <div id="order">
        {timeover && <Animated animationIn="fadeIn" animationInDelay={500}><StyledButton onClick={nextPose}>다음 동작</StyledButton></Animated>}
        {timeover && <Animated animationIn="fadeIn" animationInDelay={500}><StyledButton onClick={prePose}>이전 동작</StyledButton></Animated>}
        </div>
        </>
    );
};

export default First;