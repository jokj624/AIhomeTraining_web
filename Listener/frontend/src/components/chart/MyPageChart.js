import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";
import { useSelector } from 'react-redux';
import palette from '../../lib/style/palette';
const MyDiv = styled.div`
  display: inline-block;
  width : 50%;
  height : 100%;
`;
const Level = styled.div`
  text-align:center;
  font-size:1.5rem;
  margin-top:1.5rem;
  color : ${palette.gray[8]};
`;

const MyPageChart = () => {
    const user = useSelector(({ user }) => ({ user: user.user }));
    let data = {
      datasets: [
        {
          data: [10, 20],
          backgroundColor: [
            "rgba(54, 162, 235, 1)",
            
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            
          ],
          borderWidth: 0.3,
          weight : 0.3
        }
      ]
  };
    let val = 0;
    const time = user.user.totalTime;
    if(time > 420 && time <= 840)   val = 420;
    else if(time> 840 && time <= 1260) val = 840;
    else if(time > 1260 && time <= 1680)    val = 1260;
    else if(time > 1680 && time <= 2100)    val = 1680;
    else if(time > 2100 && time <= 2520)    val = 2100;
    else if(time > 2520)  val = 2520;    
    data.datasets[0].data[0]=((time-val)/420) * 100;
    data.datasets[0].data[1]=100-(((time-val)/420) * 100);
    const text = "현재 경험치 "+Math.floor((time-val)/420 * 100)+"%"; 
    return (
        <MyDiv>
          <Doughnut data={data} />
          <Level>{text}</Level>
        </MyDiv>
        
      );

};
  
  export default MyPageChart;