import React from 'react';
import Button from '../components/common/Button';
import styled from 'styled-components';
import palette from '../lib/style/palette';
import './PostListPage.css';
import Fade from 'react-reveal';
import backgroundVideo from '../video/backgroundVideo.mp4';

import './HomePage.css'

const ButtonHome = styled(Button)`
  font-size : 1.5rem;
  margin : 1.5rem;
  display : block;
  width : 230px;
  height : 70px;
  background: ${palette.gray[9]};
  &:hover {
    background: ${palette.gray[6]};
  }
  @media (max-height : 800px) {
    width : 200px;
    height : 60px;
  }
`;

const VideoDiv = styled.div`
  padding : 0;
  width : 100vw;
  height :100vh;
  overflow : hidden;
  position : absolute;
  text-align : center;
  background-repeat : 'no-repeat';
  background-position: center center;
  background-size: cover;
`;
const Video = styled.video`
  width:100%;
  object-fit : cover;
  @media screen and (max-aspect-ratio: 3840/2160) {
      width : auto;
      height : 100vh;
  }
`;

const BgColor = styled.div`
  width : 100%;
  height: 100%;
  position : absolute;
  z-index :1;
  background-size : cover;
  background-color : rgba(0, 0, 0, 0.3);
`;

const BtnDiv = styled.div`
  position absolute;
  left : 80%;
  transform:translateX(-80%);
  bottom : 10%;
  z-index : 2; 
  @media (max-width: 768px) {
    left : 50%;
    transform:translateX(-50%);
  }

`;

const Title = styled.div`
  position : absolute;
  color : white;
  z-index : 3;
  text-align : left;
  left : 20%;
  transform:translateX(-20%);
  top : 10%;
  font-family: 'Anton', sans-serif;
  
  h1 {
    font-size : 7rem;
    margin-bottom : -10px;
  }
  span {
    font-size : 9rem;
    text-shadow : 10px 10px black;
  }

  @media (max-height : 800px) {
    h1 {
      font-size : 4rem;
    }
    span {
      font-size : 6rem;
    }
  }
`;

const PostListPage = ( { history } ) => {
    return (
      <div className="App">
        <>
        <Title>
          <h1><span>M</span>y</h1>
          <h1><span>AI</span></h1>
          <h1><span>T</span>rainer</h1>
        </Title>
        <BtnDiv>
        <Fade bottom delay = {3000}>
          <ButtonHome fullWidth onClick ={ () =>
            {history.push("/login")}}>SignIn</ButtonHome>
          <ButtonHome fullWidth onClick ={ () =>
            {history.push("/register")}}>SignUp</ButtonHome>
           </Fade>
        </BtnDiv>
       
        <BgColor/>
        <VideoDiv>
        <Video 
          loop = {true}
          autoPlay = {true}
          muted = {true}>
          <source src={backgroundVideo} type='video/mp4'/>
        </Video>
        </VideoDiv>
      </>
    </div> 
    );
};

export default PostListPage;