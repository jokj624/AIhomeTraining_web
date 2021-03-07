import React, { useState, useEffect } from 'react';
import Test from '../../components/exercises/Test';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import palette from '../../lib/style/palette';
import { useSelector, useDispatch } from 'react-redux';
import Check from '../../components/exercises/Check';
import First from './First';
import Responsive from '../../components/common/Responsive';
import {Animated} from "react-animated-css";
import { writeExercise } from '../../modules/exercise';
import { updateTotalTime, updateLevel } from '../../modules/auth';
import './ExerciseContainer.css';

//import squat from './image/squat';

const ButtonWrapper = styled.div`
  position:absolute;
  bottom: 0; left:50%;
  transform: translate(-50%, -50%);
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
  bottom: 0; left:50%;
  transform: translate(-50%, -50%);
`;
const Spacer = styled.div`
  height: 4rem;
  `;

const Text = styled.div`
  display: block;
  width: 100%;
  text-align: center;
`;

let analysis = [];
const getData = (data) => {
  analysis = data;
  console.log(analysis);
};

const ExerciseContainer = () => {
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.modify,
    auth: auth,
    authError: auth.authError,
    user: user.user
  }));
  const expose = ["스쿼트", "런지", "숄더프레스"];
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
    <Spacer/>
    <div className="ec">
      {first && <div><First/><Spacer/><StyledButton onClick={videoOn}>시작</StyledButton></div>}
      {showResults && 
      <div id="extime">
        운동시간 <span id="hours">00</span> : <span id="minutes">00</span> : <span id="seconds">00</span>
        <Test getData = {getData}/><Spacer/><StyledButton onClick={videoOff}>종료</StyledButton>
      </div>}
      {(!first && !showResults) &&
      <div>
        <Check analysis={analysis}/>
        <ButtonWrapper><StyledButton2 onClick={videoOn}>다시시작</StyledButton2> <StyledButton2 onClick={linkTo}>끝내기</StyledButton2></ButtonWrapper>
      </div>}
    </div>
    </>
  ) 
};
export default ExerciseContainer;