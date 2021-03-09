import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import Fade from 'react-reveal';
import './Main.css'
import MainPhoto from './MainPhoto';
import MainCard from './MainCard';
import MainAbout from './MainAbout';
const Spacer1 = styled.div`
  height: 0.3rem;
`;

const Tutorial = styled(Responsive)`
  padding-top: 3%;
    h1 {
        font-size : 1.2rem;
        border-bottom: 2px solid rgba(0, 0, 0, 0.08);
    }
    span {
        font-size : 1rem;
    }
`;
//      <Text><h1 style={{zIndex: '100'}}>Hello world</h1></Text>
const Main = () => {
    return (
      <>
      <Spacer1 />
      <MainPhoto/> 
      
      <Tutorial>
      <Fade bottom>
        <MainAbout />
        <MainCard />
      </Fade>
      </Tutorial> 
      
      <Spacer1/>
      
      </>
    );
  };
  
  export default Main;