import React, {useState} from "react";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";
import { useSelector } from 'react-redux';
import palette from '../../lib/style/palette';

const MyDiv = styled.div`
  display: inline-block;
  width : 100%;
  height : 100%;
  text-align: center;
`;
const Level = styled.div`
  display:inline;
  text-align:center;
  font-size:1.5rem;
  font-weight: bold;
  color : ${palette.gray[8]};
`;

const MyPageChart = () => {
    const user = useSelector(({ user }) => ({ user: user.user }));
    let data = {
      datasets: [
        {
          data: [10, 20],
          backgroundColor: [
            "rgb(110,198,221)",
            
          ],
          borderColor: [
            "rgb(110,198,221)",
            
          ],
          borderWidth: 0.3,
          weight : 0.3
        }
      ]
  };
    let val = 1, lefttime = 0, num = 0;
    const time = user.user.totalTime;
    lefttime = 420-time;
    if(time > 420 && time <= 840){   
      val = 2;
      lefttime = 840-time;
    } else if(time> 840 && time <= 1260){
      val = 3;
      lefttime = 1260-time;
    } else if(time > 1260 && time <= 1680){
      val = 4;
      lefttime = 1680-time;
    } else if(time > 1680 && time <= 2100){
      val = 5;
      lefttime = 2100-time;
    } else if(time > 2100 && time <= 2520){
      val = 6;
      lefttime = 2520-time;
    } else if(time > 2520){
      val = 7;
      lefttime = 0;
    }
    if(val != 7){    
      data.datasets[0].data[0]=(time/(420 * val)) * 100;
      data.datasets[0].data[1]=100-((time/(420 * val)) * 100);
      num = Math.floor(data.datasets[0].data[0]);
    } else if(val == 7){
      data.datasets[0].data[1] = 0;
      num = "MAX"
    }
    const text = "현재 경험치 "; 
    
    return (
        <MyDiv>
          <Doughnut data={data}/>
          <br/>
          <div style={{paddingBottom: '5%'}}>  
            <Level>{text}
            <Level style={{color:'#6ec6dd'}}>{num}</Level> %</Level>
            <br/>
            {lefttime>0 && <Level style={{fontSize: '1.2em'}}>다음 레벨 승급까지   
            <Level style={{fontSize: '1.2em', color: '#6ec6dd'}}> {lefttime}</Level> 분 남았습니다.</Level>}
          </div>
        </MyDiv>
      );
};
  
  export default MyPageChart;