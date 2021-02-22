import React from 'react';
import Button from '../components/common/Button';
import styled from 'styled-components';
import palette from '../lib/style/palette';
import P5Wrapper from 'react-p5-wrapper';
import sketch from '../sketch/MainSketch';
import './PostListPage.css';
import Fade from 'react-reveal';

const ButtonHome = styled(Button)`
  margin : 1rem;
  display : block;
  width : 200px;
  height : 50px;
  background: ${palette.gray[6]};
  &:hover {
    background: ${palette.cyan[6]};
  }
`;


const PostListPage = ( { history } ) => {
    return (
      <div className="App">
        <>
        <P5Wrapper sketch={sketch} />
        <div className ="main_div">
        <div className="main" onClick ={ () =>
            {history.push("/main")}}>
        </div>
        <Fade bottom cascade>
        <div className = "bnt_div">
          <ButtonHome fullWidth onClick ={ () =>
            {history.push("/login")}}>SignIn</ButtonHome>
          <ButtonHome fullWidth onClick ={ () =>
            {history.push("/register")}}>SignUp</ButtonHome>
        </div>
        </Fade>
      </div>
      </>
    </div> 
    );
};

export default PostListPage;