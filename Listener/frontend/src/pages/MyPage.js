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
import palette from '../lib/style/palette';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const MainDiv = styled.div`
  width : 100%;
  align-items: center;
  display: flex;
`;
const MyDiv = styled.div`
  display : inline-block;
  width: auto;
  hegiht: 100%;
  padding: 5%;
`;
const InfoDiv = styled.div`
  font-size : 1.3rem;
  margin-top : 0.5rem;
`;
const Wrapper = styled(Responsive)`
    display: flex;
    align-items: center;
    padding: 10px 0;
    span{
      font-size: 2em;
      font-weight: bold;
    }

`;

const Ex = styled.div`
    position: relative;
    width: 90%;
    left: 5%;
    border-radius: 5px;
    box-shadow: 5px 5px 5px 5px gray;
    padding-bottom: 2rem;
    background-color: #f7f7f7;
    align-items: center;
    h2{
        padding-top: 15px;
        font-weight: bold;
        text-align: center;
    }

`;
const Mt = styled.span`
    font-size: 2em;
    color: black;
    font-style: oblique;
    font-weight: bold;
    &:hover{
        color: gray;
        text-decoration: none;
    }
`;
const Ai = styled.span`
  color : ${palette.indigo[9]};
`;
const useStyles = makeStyles({
  pc: {
    minWidth: 500,
    maxWidth: 500,
    minHeight: '50%',
    textAlign: 'center',
    boxShadow: "1px 6px 6px 1px rgba(0, 0, 0, 0.2)",
  },
  mobile: {
    minWidth: '100%',
    minHeight: '50%',
    maxWidth: '100%',
    textAlign: 'center',
    boxShadow: "1px 6px 6px 1px rgba(0, 0, 0, 0.2)",
  },
 
});
const useStyles2 = makeStyles({
  root: {
    minWidth: '100%',
    minHeight: '50%',
    boxShadow: "1px 6px 6px 1px rgba(0, 0, 0, 0.2)",
  },
});
const MyPage = ({match}) => {
  const [str, setStr] = useState('헬스 새싹');
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const classes = useStyles();
  const charclasses = useStyles2();
  const matches1000 = useMediaQuery('(max-width:1060)');
  const imgKey = matches1000 ? 'mobile' : 'pc';
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
      <Grid>
      <Card className={classes[imgKey]}>
        <div style={{marginLeft: '12px', color: '#616161', float: 'left'}}>
          <i class="fas fa-running fa-2x"></i>
          <span> level</span> 
        </div>
        <MyPageChart/>
      </Card>
      <br/><br/>
      <Card className={classes[imgKey]}>
        <div style={{marginLeft: '12px', color: '#616161', float: 'left'}}>
          <i class="fas fa-running fa-2x"></i>
          <span> Info</span> 
        </div>
        
      </Card></Grid>
    </Wrapper>
    <Wrapper>
      <Card className = {charclasses.root}>
        <div style={{marginLeft: '12px', color: '#616161', float: 'left'}}>
          <i class="fas fa-chart-line fa-2x"></i>
          <span> Monthly Statistics</span> 
        </div>
        <div style={{ marginTop: '5%' }}>
          <MonthExer />
        </div>
      </Card>
    </Wrapper>
    <FooterContainer />
    </>
  );
   /* return (
      <>
      <Helmet>
        <title>My Page</title>  
      </Helmet>
      <HeaderContainer />
      <NavContainer />
      <br/><br/><br/>
      <Ex>
      <div style = {{ paddingTop: '10px', paddingBottom: '10px', backgroundColor: '#e9e9e9', textAlign: 'center'}} >
        <h2>{user.level} {user.username}</h2>
      </div>
      <div style = {{float: 'right', padding: '2% 3%'}}>
          <Link to={`/modify/${user._id}`} style={{color: 'black', textDecoration: 'none'}}>
              <Button>회원정보수정</Button>
          </Link>
      </div>

      <Wrapper>
      <MainDiv>
      <MyPageChart/>
      <MyDiv>
      <div>
        <InfoDiv className="name">{user.username}</InfoDiv><hr/>
        <InfoDiv className="level">현재 레벨은 {user.level} {str} 입니다.</InfoDiv><hr/>
        <InfoDiv className="time">총 운동 시간 {user.totalTime}분 </InfoDiv> 
      </div><hr/>
      <br/><br/>
      </MyDiv>
      </MainDiv>
      </Wrapper>
      <div style={{textAlign:'center', fontSize: '1.5em', fontWeight: 'bold', padding: '3% 0'}}>월 별 운동 시간 통계</div>

      <Wrapper>
        <MonthExer/>
      </Wrapper>
      </Ex>
      <FooterContainer />
      </>
  );*/
};

export default MyPage;