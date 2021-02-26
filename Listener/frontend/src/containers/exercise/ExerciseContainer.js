import React, { useState, useEffect } from 'react';
import Test from '../../components/common/Test';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import palette from '../../lib/style/palette';
import { useSelector, useDispatch } from 'react-redux';
import Check from '../../components/common/Check';
import First from './First';
import Responsive from '../../components/common/Responsive';

const StyledButton = styled(Button)`
  height: 2rem;
  & + & {
    margin-left: 0.5rem;
  }
  background: ${palette.gray[7]};
  &:hover {
    background: ${palette.gray[5]};
  }
`;
const Spacer = styled.div`
  height: 4rem;
  `;

const Wrapper = styled(Responsive)`
  display: flex;
  align-items: center;
  height: 100%;
`;
const Text = styled.div`
  display: block;
  width: 100%;
  text-align: center;
`;

const ExerciseContainer = () => {
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.modify,
    auth: auth,
    authError: auth.authError,
    user: user.user
  }));
  const [showResults, setShowResults] = useState(false);
  const [first, setFirst] = useState(true);
  var total = 0;
  var seconds = 0;
  var minutes = 0;
  var hours = 0;
  var time;

  const videoOff = () => {
      
      if (showResults === true) {
        const video = document.querySelector('video');
        const mediaStream = video.srcObject;
        const tracks = mediaStream.getTracks();
        tracks[0].stop();
        tracks.forEach(track => track.stop())
      }
      
      setShowResults(false);
      user.s = total;
      console.log(user.s);
  };

  const videoOn = () => {
    setShowResults(true);
    setFirst(false);
  };

  useEffect(() => {
    if (showResults === true) {
      time = setInterval(() => {
        total++;
        hours = parseInt(total/60/60);
        if (hours >=0 && hours <=9)
          hours = "0" + hours;
        minutes = parseInt(total%(60*60)/60);
        if (minutes >=0 && minutes <=9)
          minutes = "0" + minutes;
        seconds = parseInt(total%60);
        if (seconds >=0 && seconds <=9)
          seconds = "0" + seconds;
        document.getElementById('hours').innerHTML = hours;
        document.getElementById('minutes').innerHTML = minutes;
        document.getElementById('seconds').innerHTML = seconds;
      }, 1000);
    }
    return () => clearInterval(time); 
  });

  return (
    <>
    <Wrapper>
    <Spacer />
    <Text>
    { first ? <First/> : <div>{ showResults ? <div><div id="time">운동 시간 <span id="hours">00</span>:<span id="minutes">00</span>:<span id="seconds">00</span></div><Test/></div>
    : <Check/> }</div> }
    </Text>
    <div style={{position: 'absolute', bottom: '0', left: '50%', marginLeft: '-31px'}}>
    { first ? <StyledButton onClick={videoOn} style={{width: '62px'}}>시작</StyledButton> : <div>{ showResults ? <StyledButton onClick = {videoOff}>종료</StyledButton> : <StyledButton onClick={videoOn}>재시작</StyledButton>}</div>}
    </div>
    </Wrapper>
    </>
  )
};
export default ExerciseContainer;