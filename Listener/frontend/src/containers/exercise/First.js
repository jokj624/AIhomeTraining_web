import React, { useEffect, useState } from 'react';
import {Animated} from "react-animated-css";
import styled from 'styled-components';
import image1 from '../../img/squat.gif';
import image2 from '../../img/lunge.gif';
import image3 from '../../img/shoulderpress.gif';
import image4 from '../../img/tree.png';
import './First.css'; //이거 키면 main 이상해져
import Button from '../../components/common/Button';
import palette from '../../lib/style/palette';
import Responsive from '../../components/common/Responsive';
import FirstExer from '../../components/exercises/FirstExer';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';


const Hello = styled(Responsive)`
    text-align : center;
    
`;

const Wrapper = styled.div`
font-size : 16px;
margin : 0 auto;
height: 600px;
@media screen (max-width: 768px) {
    height : 950px;
};
`;
const Spacer = styled.div`
  height: 4rem;
  `;


  const StyledButtonPre = styled(Button)`
  background: ${palette.gray[6]};
  &:hover {
    background: ${palette.gray[5]};
  }
    font-size : 0.8rem;
    margin-right: 24rem;
    display : inline-block;
    padding-left : 5px;
    @media (max-width: 900px) {
        margin-right: 8rem;
    };
`;
const StyledButtonNext = styled(Button)`
background: ${palette.gray[6]};
&:hover {
  background: ${palette.gray[5]};
}
  font-size : 0.8rem;
  margin-left: 24rem;
  display : inline-block;
  padding-right : 5px;
  @media (max-width: 900px) {
      margin-left: 8rem;
  };
`;
const Order = styled.div`
@media screen (max-width: 768px) {
  align-items : center;
};
`

const First = ({setSquatCount, setLungeCount, setShoulderCount}) => {
       const [timeover, setTimeover] = useState(false);
       const [visible1, setVisible1] = useState(true);
       const [visible2, setVisible2] = useState(true);
       const [exerciseEx, setExerciseEx] = useState(false);
       const [pose, setPose] = useState(0);

       const styleExplain = {
        fontSize : "1.3rem",
        textAlign : "center"
    };

    const styleExercise = {
     textAlign : "center"
    };

       let time1=0;
       let menus = ["안녕하세요", "운동을 시작해보겠습니다.", "우리가 할 운동은 다음과 같이 4가지 입니다."];
        let menuList = menus.map((menu) => {
            return <Animated 
                    animationIn="fadeIn" 
                    animationInDelay={1000} 
                    animationOut="fadeOut" 
                    animationOutDelay={2000} 
                    isVisible={visible1}
                    style = {styleExplain}>{menu}</Animated>
        });
    
     useEffect(() => {
        setTimeout(function() {
            setVisible1(false);
        }, 5000);
        setTimeout(function() {
            setTimeover(true);
        }, 8000);
     }, []);


     const nextPose = () => {
        if (pose === 0)
            setPose(1);
        else if (pose === 1)
            setPose(2);
        else if (pose === 2)
            setPose(3);
        else
            setPose(0);
     };

     const prePose = () => {
         if (pose === 1)
            setPose(0);
        else if (pose === 2)
            setPose(1);
        else if (pose === 3)
            setPose(2);
        else
            setPose(3);
     }

     const showExer = () => {
         setVisible2(false);
         setTimeout(function() {
            setExerciseEx(true);
         }, 3000);
     }

     const setSCount = (e) => {
         setSquatCount(e.target.value);
     }

     const setLCount = (e) => {
        setLungeCount(e.target.value);
     }

     const setShCount = (e) => {
         setShoulderCount(e.target.value);
     }
    

    return (
        <>
        
        {!timeover &&
         <Wrapper>
         <Spacer/>
         <Hello>{menuList}
         <Spacer/>
             <Animated
                 animationIn="fadeIn"
                 animationInDelay={2000}
                 animationOut="fadeOut"
                 animationOutDelay={2000}
                 isVisible={visible1}
             >
                 <FirstExer/>
             </Animated>
         </Hello>
     </Wrapper>}
        {( timeover && !exerciseEx ) &&
        <Wrapper>
            <div id="hello">
                <Animated animationIn="fadeIn" animationInDelay={1000} animationOut="fadeOut" animationOutDelay={500} isVisible={visible2}>
                <div className="inputWrapper">
                <div id="setCount">먼저 각 운동별 목표 개수를 입력해주세요.<br/>운동 준비가 되었다면 시작버튼을,<br/>운동 자세를 보시려면 운동자세 보기를 눌러주세요.</div>
                    <table id="inputCount">
                        <tr id="squat">
                            <td>
                            스쿼트
                            </td>
                            <td>
                            <input className="inputBox" type="text" onChange={setSCount} placeholder="15"/>
                            </td>
                            <div className="recomend" id="squEx">스쿼트는 10~15회씩 3~5set를 기본으로 합니다. 처음이시라면 10회부터 시작하여 천천히 늘려보세요.</div>
                        </tr>
                        <tr id="lunge">
                            <td>
                            런지
                            </td>
                            <td>
                            <input className="inputBox" type="text" onChange={setLCount} placeholder="15"/>
                            </td>
                            <div className="recomend" id="lunEx">런지는 한 쪽 다리에 10~15회씩 3~5set를 기본으로 합니다. 처음이시라면 10회부터 시작하여 천천히 늘려보세요.</div>
                        </tr>
                        <tr id="press">
                            <td>
                            숄더프레스
                            </td>
                            <td>
                            <input className="inputBox" type="text" onChange={setShCount} placeholder="15"/>
                            </td>
                            <div className="recomend" id="preEx">숄더프레스는 6~15회씩 4set를 기본으로 합니다. 자신에게 알맞은 무게의 덤벨을 이용하면 더 큰 운동 효과를 볼 수 있습니다. 가벼운 무게부터 시작하여 천천히 중량을 늘려보세요.</div>
                        </tr>
                    </table>
                    <div id="showExer" onClick={showExer}>운동자세 보기</div>
                    </div>
                </Animated>
            </div>
        </Wrapper>}
        <div className="ex">
                {(exerciseEx && pose === 0) && <Animated animationIn="fadeIn" animationInDelay={500}>
                <div id="pose">SQUAT</div>
                <img id="image" src={image1}/>
                <span id="posetext">
                    <ol>
                        <li>카메라를 바라보는 방향을 기준으로 오른쪽으로 몸을 돌리고 섭니다.</li>
                        <li>두 손은 모은 상태를 유지합니다.</li>
                        <li>양발의 간격은 골반보다 조금 더 넓게 유지하고, 양발 끝은 바깥쪽으로 15도~20도 정도 벌려줍니다.</li>
                        <li>상체는 그대로 꼿꼿이 유지하면서 천천히 엉덩이를 뒤로 빼며 무릎을 굽혀 앉는 자세를 취합니다.</li>
                        <li>허벅지가 바닥과 평행이 되면 천천히 준비자세로 돌아옵니다.</li>
                    </ol>
                </span>
                </Animated>}
                {(exerciseEx && pose === 1) && <Animated animationIn="fadeIn" animationInDelay={500}>
                <div id="pose">SIDE LUNGE</div>
                <img id="image" src={image2}/>
                <span id="posetext">
                    <ol>
                        <li>카메라를 바라보는 방향으로 섭니다.</li>
                        <li>두 손은 모은 상태를 유지합니다.</li>
                        <li>양발의 간격이 어깨의 2배정도 되도록 벌려줍니다.</li>
                        <li>한쪽 방향으로 몸을 옮겨 체중을 실어주며 옮기는 쪽 다리에 대부분의 힘을 준 상태로 허리는 꼿꼿이 펴고 엉덩이를 뒤로 빼며 체중을 실은 쪽의 무릎을 굽혀줍니다.</li>
                        <li>굽힌 쪽의 허벅지가 바닥과 평행이 되면 천천히 준비자세로 돌아옵니다.</li>
                    </ol>
                </span>
                </Animated>}
                {(exerciseEx && pose === 2) && <Animated animationIn="fadeIn" animationInDelay={500}>
                <div id="pose">SHOULDER PRESS</div>
                <img id="image" src={image3}/>
                <span id="posetext">
                    <ol>
                        <li>카메라를 바라보는 방향으로 섭니다.</li>
                        <li>양발의 간격은 어깨너비로 벌립니다.</li>
                        <li>허리는 꼿꼿이 핀 상태를 유지합니다.</li>
                        <li>어깨 좌우 대칭을 유지하고, 손목과 팔꿈치가 일자를 이루도록 하며 팔을 완전히 위쪽으로 펴줍니다.</li>
                        <li>천천히 준비자세로 돌아옵니다.</li>
                    </ol>
                </span>
                </Animated>}
                {(exerciseEx && pose === 3) && <Animated animationIn="fadeIn" animationInDelay={500}>
                <div id="pose">TREE POSE</div>
                <img id="image" src={image4}/>
                <span id="posetext">
                    <ol>
                        <li>카메라를 바라보는 방향으로 섭니다.</li>
                        <li>오른쪽 다리를 구부려 들어올립니다.</li>
                        <li>구부린 다리를 옆으로 열어 골반을 열어줍니다.</li>
                        <li>구부린 다리를 손으로 잡아 반대 쪽 다리의 허벅지 옆면에 붙여줍니다.</li>
                        <li>몸의 균형을 잡고 천천히 양 손을 가슴 앞에 모아주어 자세를 유지합니다.</li>
                    </ol>
                </span>
                </Animated>}
                <Order>
                    {timeover && <StyledButtonPre onClick={prePose}><NavigateBeforeIcon/>이전 운동</StyledButtonPre>}
                    {timeover && <StyledButtonNext onClick={nextPose}>다음 운동<NavigateNextIcon/></StyledButtonNext>}
                </Order>              
        </div>
        </>
    );
};

export default First;