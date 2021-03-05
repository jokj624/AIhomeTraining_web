import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {Animated} from "react-animated-css";

const Wrapper = styled.div`
    position:absolute;
    top:50%; left:50%;
    transform: translate(-50%, -50%); 
    text-align: center;
`;

const Check = ({analysis}) => {
    const [showResults, setShowResults] = useState(false);
    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
        form: auth.modify,
        auth: auth,
        authError: auth.authError,
        user: user.user
      }));
      const hours = parseInt(user.s/60/60);
      const minutes = parseInt(user.s%(60*60)/60);
      const seconds = parseInt(user.s%60);
      console.log(analysis);

    useEffect(() => {
      setTimeout(()=>{
        setShowResults(true);
      }, 3000);
    }, [])

  return (
    <Wrapper> {showResults && 
      <Animated>운동한 시간 : {hours}시간 {minutes}분 {seconds}초</Animated>}<br/><br/> 
      {showResults&&<Animated>운동을 다시 진행하시려면 다시하기 버튼을,<br/>끝내시려면 끝내기 버튼을 눌러주세요.</Animated> }
    {!showResults && <div>로딩 중...</div>}
    </Wrapper>
  )
};


export default Check;