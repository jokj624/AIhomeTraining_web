import React from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from 'react-redux';

const MonthExer = () => {

    let jan = 0, feb = 0, mar = 0, apr = 0, may = 0, jun = 0, jul = 0, aug = 0, sep = 0, oct = 0, nov = 0, dec = 0;
    const user = useSelector(({user}) => ({
        user: user.user
    }));
    const exercises = user.user.exercises;
    const date = [];
    if(exercises){
    const len = exercises.length;
    //date배열에 달만 뽑아서 저장
    for(let i = 0 ; i< len; i++) {
        const exerDate = exercises[i].date;
        date[i] = exerDate.slice(5,7);
    }

    for(let i=0; i<len; i++) {
        switch (date[i]) {
            case "01" :
                jan += exercises[i].title;
                break;
            case "02" :
                feb += exercises[i].title;
                break;
            case "03" :
                mar += exercises[i].title;
                break;
            case "04" :
                apr += exercises[i].title;
                break;
            case "05" :
                may += exercises[i].title;
                break;
            case "06" :
                jun += exercises[i].title;
                break;
            case "07" :
                jul += exercises[i].title;
                break;
            case "08" :
                aug += exercises[i].title;
                break;
            case "09" :
                sep += exercises[i].title;
                break;
            case "10" :
                oct += exercises[i].title;
                break;
            case "11" :
                nov += exercises[i].title;
                break;
            case "12" :
                dec += exercises[i].title;
                break;
        }
    };
}

    let data = {
        labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
        datasets: [{
            label: '총 운동 시간',
            data: [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec ],
            borderWidth: 1,
            borderColor: "rgba(110,198,221, 1)",
            backgroundColor: "rgba(110,198,221, 0.3)",
            fill: true,
            lineTension: 0.2
        }]
    };

    let options = {
        maintainAspectRatio: true, // default value. false일 경우 포함된 div의 크기에 맞춰서 그려짐.

        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    };

    return (
          <Line 
          data = {data}
          options = {options}/>
          
      );

}

export default MonthExer;