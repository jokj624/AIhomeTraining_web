import React, {useState, useEffect} from 'react';
import HeaderContainer from '../containers/common/HeaderContainer'; 
import { useSelector} from 'react-redux';
import NavContainer from '../components/common/Navbar';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MyPageChart from '../components/chart/MyPageChart';
import { Helmet } from 'react-helmet-async';
import FooterContainer from '../containers/common/FooterContainer';
import Responsive from '../components/common/Responsive';
import Button from '../components/common/Button';
import MonthExer from '../components/chart/MonthExer';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const Wrapper = styled(Responsive)`
    display: flex;
    align-items: center;
    padding: 10px 5px;
    span{
      font-size: 2em;
      font-weight: bold;
    }
    ul{
      color: #616161;
      font-size: 1.2em;
      margin-top: 1em;
      h2 {
        color: black;
      }
    }
    @media (max-width: 768px) {
      span{
        font-size: 1.5em;
        font-weight: bold;
      }
    }
   
`;

const ChartDiv = styled.div`
  margin-top: 5%;
`;
const InterDiv = styled.div`
  margin-left: 12px;
  margin-top: 5px;
  color: #616161;
  float: left;
`;
const useStyles = makeStyles({
  pc: {
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '50%',
    boxShadow: "1px 6px 6px 1px rgba(0, 0, 0, 0.2)",
  },
  mobile: {
    minWidth: '100%',
    minHeight: '50%',
    maxWidth: '100%',
    marginLeft: '5%',
    boxShadow: "1px 6px 6px 1px rgba(0, 0, 0, 0.2)",
  },
});
const useStyles2 = makeStyles({
  pc: {
    minWidth: '100%',
    minHeight: '100%',
    boxShadow: "1px 6px 6px 1px rgba(0, 0, 0, 0.2)",
  },
  mobile: {
    minWidth: '100%',
    minHeight: '100%',
    marginLeft: '5%',
    boxShadow: "1px 6px 6px 1px rgba(0, 0, 0, 0.2)", 
  }
});
const MyPage = ({match}) => {
  const [str, setStr] = useState('헬스 새싹');
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const classes = useStyles();
  const charclasses = useStyles2();
  const matches = useMediaQuery('(max-width:768px)');
  const imgKey = matches ? 'mobile' : 'pc';
  const space = matches ? 11 : 6;  
  const monthspace = matches ? 11 : 12;
  console.log(imgKey);
  useEffect(() => {
    let lv = user.level;   
    if(lv == '🐣') setStr('헬스 병아리');
    else if(lv == '👶') setStr('헬린이');
    else if(lv == '🏋')  setStr('헬스 홀릭');
    else if(lv == '💪')  setStr('헬스 전문가');
    else if(lv == '👿')  setStr('PT 쌤');
    else if(lv == '🦍')  setStr('측정 불가');
  }, [user]);   

  return(
    <>
    <Helmet>
      <title>My Page</title>  
    </Helmet>
    <HeaderContainer />
    <NavContainer />
    <br/><br/><br/>

    <Wrapper>
      <Grid container spacing={3}>
       <Grid item xs = {space} >
        <Card className={classes[imgKey]} variant="outlined">
          <InterDiv>
            <i class="fas fa-running fa-2x"></i>
            <span> level</span> 
          </InterDiv>
          <MyPageChart/>
        </Card>
        </Grid>
        <Grid item xs = {space}>
        <Card className={classes[imgKey]} variant="outlined">
          <InterDiv>
            <i class="fas fa-user fa-2x"></i>
            <span> Info</span> 
          </InterDiv> 
          <br/><br/>
          <ul>
            <li>닉네임 <h2>{user.username}</h2></li>
            <li>레벨 <h2>{user.level} {str}</h2></li>
            <li>총 운동 시간 <h2>{user.totalTime} 분</h2></li>
          </ul>
          <div style={{float: 'right', padding: '5%'}}>       
          <Link to={`/modify/${user._id}`} style={{color: 'black', textDecoration: 'none'}}>
              <Button>회원 정보 수정</Button>
          </Link>
          </div>
        </Card>
        </Grid>
        <Grid item xs = {monthspace} >
        <Card className = {charclasses[imgKey]} variant="outlined">
          <InterDiv>
            <i class="fas fa-chart-line fa-2x"></i>
            <span> Monthly Statistics</span> 
          </InterDiv>
          <ChartDiv>
            <MonthExer />
          </ChartDiv>
        </Card>
        </Grid>
        </Grid>
    </Wrapper>
    
    <FooterContainer />
    </>
  );
};

export default MyPage;