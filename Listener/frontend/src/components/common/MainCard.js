import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Responsive from './Responsive';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/style/palette';
import './MainAbout.css';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


const Wrapper = styled(Responsive)`
    display: inline-flex;
    align-items: center;
    width: 100%;
    z-index: 100;
    justify-content: space-between; /* 자식 엘리먼트 사이에 여백을 최대로 설정 */
    @media only screen and (max-width: 700px) {
        display: inline-block;
    }
`;
const InDiv = styled(Responsive)`
    margin-top: 3px;
`;

const LinkTo = styled(Link)`
    &:hover{
        text-decoration: none;
    }
`;
const useStyles = makeStyles({
  root: {
    maxWidth: '370px', 
    height: '240px',
    margin: 'auto',
    boxShadow: '5px 5px 5px 3px #616161',
    marginBottom : '15px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 5px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 15,
    marginBottom : '10px',
  },
  pos: {
    marginBottom: 12,
  },
});

const About = styled(Responsive)`
    h2 {
      font-family: 'Poppins', sans-serif;
        padding : 15px;
        margin-bottom : 70px;
        font-size : 2.5rem;
        border-bottom : 2px solid ${palette.gray[5]};
    }
    p {
      margin-bottom : 5px;
      font-style : italic;
      font-size : 1.1rem;
    }
    span {
      font-size : 1.1rem;
      font-weight : bold;
    }
    text-align : center; 
`;


export default function MainCard() {
  const classes = useStyles();
  return (
    <>
    <About>
      <h2>TUTORIAL</h2>
    </About>
    <Wrapper>
    <InDiv>
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          STEP 1
        </Typography>
        <Typography variant="h5" component="h2">
          오늘의 운동
        </Typography>
        <Typography variant="body2" component="p">
          <br/>
          시작 버튼을 누르고 준비된 운동을 완료하세요.<br/>
          운동 자세를 인식하여 완료 후 운동 자세를 분석해줍니다.           
        </Typography>
      </CardContent>
      <CardActions>
        <LinkTo to="/todaytr">
        <Button size="large" startIcon={<NavigateNextIcon />} style={{fontWeight:'bold'}}>지금 시작하기</Button>
        </LinkTo>
      </CardActions>
      </Card>
        </InDiv>
        <InDiv>
      <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          STEP 2
        </Typography>
        <Typography variant="h5" component="h2">
          운동 일지
        </Typography>
        <Typography variant="body2" component="p">
          <br/>
          캘린더에서 당신만의 운동 일지를 확인해보세요.<br/>
          언제, 얼마나 열심히 운동했는지 볼 수 있습니다. <br/>
        </Typography>
      </CardContent>
      <CardActions>
        <LinkTo to="/calendar">
        <Button size="large" startIcon={<NavigateNextIcon />}  style={{fontWeight:'bold'}}>지금 확인하기</Button>
        </LinkTo>
      </CardActions>
    </Card>
    </InDiv>
    </Wrapper>
    <Wrapper>
    <InDiv>
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          STEP 3
        </Typography>
        <Typography variant="h5" component="h2">
          커뮤니티
        </Typography>
        <Typography variant="body2" component="p">
          <br/>
          매일 새로운 글들이 당신을 기다립니다.<br/>
          유저들의 운동 이야기를 보고, 당신만의 운동 노하우를 나눠보세요.
        </Typography>
      </CardContent>
      <CardActions>
        <LinkTo to="/postlist">
        <Button size="large" startIcon={<NavigateNextIcon />}  style={{fontWeight:'bold'}}>새 글 보러가기</Button>
        </LinkTo>
      </CardActions>
      </Card>
    </InDiv>
    <InDiv>
      <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          STEP 4
        </Typography>
        <Typography variant="h5" component="h2">
          마이페이지
        </Typography>
        <Typography variant="body2" component="p">
          <br/>
          당신의 운동 레벨과 경험치를 확인하세요.<br/>
          총 운동 시간에 따라 7개의 레벨로 나눠집니다.<br/>
        </Typography>
      </CardContent>
      <CardActions>
        <LinkTo to="/mypage">
        <Button className={classes.button} startIcon={<NavigateNextIcon />}  size="large" style={{fontWeight:'bold'}}>지금 확인하기</Button>
        </LinkTo>
      </CardActions>
      </Card>
      </InDiv>
    </Wrapper>
    </>
  );
}