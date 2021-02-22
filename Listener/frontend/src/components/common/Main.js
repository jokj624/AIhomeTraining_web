import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import Fade from 'react-reveal';
import './Main.css'
import MainPhoto from './MainPhoto';

const Spacer1 = styled.div`
  height: 0.3rem;
`;

const Tutorial = styled(Responsive)`
    h1 {
        font-size : 1.2rem;
        border-bottom: 2px solid rgba(0, 0, 0, 0.08);
    }
    span {
        font-size : 1rem;
    }
`

const Main = () => {
    return (
      <>
      <Spacer1 />
      <MainPhoto />
      <Tutorial>
      <Fade bottom>
          <h1>Tutorial</h1>
          <span>
            HOMETRAINING을 사용하는 방법은 다음과 같습니다.
          </span><br/><br/>
            <span>
                1. 오늘의 운동
            </span><br/>
            <ul>
                <li>메뉴에 들어가면 시작과 종료 버튼이 있습니다.</li><br/>
                <li>시작버튼을 누르면 카메라가 켜지고 운동을 할 준비가 됩니다.</li><br/>
                <li>운동자세를 취하면 확인 된 운동자세로 운동을 시작합니다.</li><br/>
                <li>운동이 끝나면 종료버튼을 눌러 종료시킵니다.</li><br/>
                <li>오늘 한 운동에 대한 결과가 나타나게 됩니다.</li><br/>
            </ul>
            <span>
                2. 운동 일지
            </span><br/>
            <ul>
            </ul>
            <span>
                3. 커뮤니티
            </span><br/>
            <ul>
            </ul>
            <span>
                4. 마이페이지
            </span><br/>
            <ul>
            </ul>
            </Fade>
      </Tutorial>
      <Spacer1/>
      
      </>
    );
  };
  
  export default Main;