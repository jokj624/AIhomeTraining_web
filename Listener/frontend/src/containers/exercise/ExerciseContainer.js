import React, { useState, useEffect } from 'react';
import Test from '../../components/exercises/Test';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import palette from '../../lib/style/palette';
import { useSelector, useDispatch } from 'react-redux';
import Check from '../../components/exercises/Check';
import First from './First';
import { writeExercise } from '../../modules/exercise';
import { updateTotalTime, updateLevel } from '../../modules/auth';
import './ExerciseContainer.css';

//import squat from './image/squat';
const Wrapper = styled.div`
  text-align: center;
`;



const ButtonWrapper = styled.div`
  position:flex;
  bottom: 0;
  margin-top : 50px;
  text-align : center;
  @media (max-width: 768px) {
    margin-top : 100px;
  }
`;

const StyledButton2 = styled(Button)`
  background: ${palette.gray[7]};
  &:hover {
    background: ${palette.gray[5]};
  }
`;
const StyledButton = styled(Button)`
  background: ${palette.gray[7]};
  &:hover {
    background: ${palette.gray[5]};
  }
  position:absolute;
  bottom: -3%; left:50%;
  transform: translate(-50%, -50%);
`;
const Spacer = styled.div`
  height: 3.5rem;
  `;

const Text = styled.div`
  display: block;
  width: 100%;
  text-align: center;
`;

const Ec = styled.div`
position: relative;
}
`;

let analysis = [];
const getData = (data) => {
  analysis = data;
  console.log(analysis);
};   //Test.js 에서 analysis 객체 받아오는 함수
let squatCount = 15;
let lungeCount = 15;
let shoulderCount = 15;
const setSquatCount = (squat) => {
  if (squat === '' || parseInt(squat) === 0)
    squatCount = 15;
  else if (squat < 0)
    squatCount = parseInt(-squat);
  else
    squatCount = parseInt(squat);
}
const setLungeCount = (lunge) => {
  if (lunge === '' || parseInt(lunge) === 0)
    lungeCount = 15;
  else if (lunge < 0)
    lungeCount = parseInt(-lunge);
  else
    lungeCount = parseInt(lunge);
}
const setShoulderCount = (shoulder) => {
  if (shoulder === '' || parseInt(shoulder) === 0)
    shoulderCount = 15;
  else if (shoulder < 0)
    shoulderCount = parseInt(-shoulder);
  else
    shoulderCount = parseInt(shoulder);
}

const ExerciseContainer = () => {
  const dispatch = useDispatch();
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
  var time;
  var msec = 0;
  var mtime;



  const videoOff = () => {
      if (showResults === true) {
        const video = document.querySelector('video');
        const mediaStream = video.srcObject;
        const tracks = mediaStream.getTracks();
        tracks[0].stop();
        tracks.forEach(track => track.stop())
      }
      setShowResults(false);
      user.s = total
      total = total/60;
      user.t = Number(total.toFixed(2));
      const username = user.username;
      const totaltime = Number((user.t + user.totalTime).toFixed(2));
      let newlevel = '🌱';
      dispatch(writeExercise({title: user.t, username : username}));

      if (totaltime < 420) 
        newlevel = '🌱';
      else if (totaltime >= 420 && totaltime < 840)
        newlevel = '🐣';
      else if (totaltime >= 840 && totaltime < 1260)
        newlevel = '👶';
      else if (totaltime >= 1260 && totaltime < 1680)
        newlevel = '🏋';
      else if (totaltime >= 1680 && totaltime < 2100)
        newlevel = '💪';
      else if (totaltime >= 2100 && totaltime < 2520)
        newlevel = '👿';
      else
        newlevel = '🦍';

      dispatch(updateTotalTime({ username : username, totalTime :totaltime, level : newlevel}));
  };
  const videoOn = () => {
    setShowResults(true);
    setFirst(false);
  };
  const linkTo = () => {
    document.location.href = "/main";
  }


  useEffect(() => {
    if (showResults) {
      setTimeout(function() {
        document.getElementById('minutes_10').innerHTML = 0;
          document.getElementById('minutes_1').innerHTML = 0;
          document.getElementById('seconds_10').innerHTML = 0;
          document.getElementById('seconds_1').innerHTML = 0;
        time = setInterval(() => {
          total++;
          minutes = parseInt(total/60);
          document.getElementById('minutes_10').innerHTML = parseInt(minutes/10);
          document.getElementById('minutes_1').innerHTML = minutes%10;
          seconds = parseInt(total%60);
          document.getElementById('seconds_10').innerHTML = parseInt(seconds/10);
          document.getElementById('seconds_1').innerHTML = seconds%10;
        }, 1000);
      }, 5000);
    }
    return () => clearInterval(time); 
  });

  useEffect(() => {
    if (showResults) {
      setTimeout(function(){
        mtime = setInterval(() => {
          msec++;
          if (msec === 10)
            msec = 0;
          document.getElementById('msec').innerHTML = msec;
        }, 100);
      }, 5000);
    }
    return () => clearInterval(mtime);
  });

  useEffect(() => {
    if (showResults === true) {
      setTimeout(function() {
        document.getElementById('ready').innerHTML = 'Ready?';
      }, 1500);
      setTimeout(function() {
        document.getElementById('ready').innerHTML = 'Start!';
      }, 3500);
      setTimeout(function() {
        document.getElementById('ready').style.visibility="hidden";
      }, 5000);
    }
  });

  return (
    <>
    <Ec>
    {first && <div><First setSquatCount={setSquatCount} setLungeCount={setLungeCount} setShoulderCount={setShoulderCount}/><Spacer/><StyledButton onClick={videoOn}>시작</StyledButton></div>}
      {showResults && 
      <Wrapper>
        <Spacer/>
        <div id="watch">
          <div id="button"></div>
          <div id="strap_top"></div>
          <div id="watch_body">
          <div id="minutes_10"></div><div id="minutes_1"></div>
          <div id="seconds_10"></div><div id="seconds_1"></div>
          <div id="msec"></div>
          <div id="ready"></div>
          </div>
          <div id="strap_bottom"></div>
        </div>
        <Test getData = {getData} squatCount={squatCount} lungeCount={lungeCount} shoulderCount={shoulderCount}/><Spacer/><StyledButton onClick={videoOff}>종료</StyledButton>
      </Wrapper>}
      {(!first && !showResults) &&
      <div>
        <Check analysis={analysis} style ={{height : "auto"}}/>
        <ButtonWrapper><StyledButton2 onClick={videoOn}>다시시작</StyledButton2> <StyledButton2 onClick={linkTo}>끝내기</StyledButton2></ButtonWrapper>
      </div>}
    </Ec>
    </>
  ) 
};
export default ExerciseContainer;