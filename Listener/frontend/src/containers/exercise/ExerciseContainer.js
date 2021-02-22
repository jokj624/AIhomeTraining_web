import React from 'react';
import Test from '../../components/common/Test';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import palette from '../../lib/style/palette';

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


const ExerciseContainer = () => {
  const videoOff = (video) => {
    navigator.webkitGetUserMedia({ video: true, audio: false }, function(stream) {
      video = document.querySelector('video');
      video.srcObject = stream;
      var localstream = stream;
      video.pause();
  	video.src = "";
  	localstream.getTracks()[0].stop();
    }, function (e) {
      console.log(e);
    })
  }

  const videoOn = (video) => {
    navigator.webkitGetUserMedia({ video: true, audio: false }, function(stream) {
      video = document.querySelector('video');
      video.srcObject = stream;
      window.localstream = stream;
      video.play();
    }, function (e) {
      console.log(e);
    })
  }

  return (
    <>
    <Spacer />
    <StyledButton onClick={videoOn}>시작</StyledButton>
    <StyledButton onClick ={videoOff}>종료</StyledButton>
    <Test/>
    </>
  )
};
export default ExerciseContainer;