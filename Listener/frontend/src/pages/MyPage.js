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

const MainDiv = styled.div`
  width : 100%;
  display: inline-block;
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
`;


const MyPage = ({match}) => {
  const [str, setStr] = useState('헬스 새싹');
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  useEffect(() => {
    let lv = user.level;   
    if(lv == '🐣') setStr('헬스 병아리');
    else if(lv == '👶') setStr('헬린이');
    else if(lv == '🏋')  setStr('헬스 홀릭');
    else if(lv == '💪')  setStr('헬스 전문가');
    else if(lv == '👿')  setStr('PT 쌤');
    else if(lv == '🦍')  setStr('측정 불가');
  }, []);   
 
    return (
      <>
      <Helmet>
        <title>My Page</title>  
      </Helmet>
      <HeaderContainer />
      <NavContainer />
      <br/><br/><br/>
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
      <div>
          <Link to={`/modify/${user._id}`} style={{color: 'black', textDecoration: 'none'}}>
              <InfoDiv>회원정보수정</InfoDiv>
          </Link>
      </div>
      </MyDiv>
      </MainDiv>
      </Wrapper>
      <FooterContainer />
      </>
  );
};

export default MyPage;