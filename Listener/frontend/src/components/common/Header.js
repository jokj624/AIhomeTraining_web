import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Responsive from './Responsive';
import Button from './Button';
import palette from '../../lib/style/palette';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  z-index : 100;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

/**
 * Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
 */
const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 자식 엘리먼트 사이에 여백을 최대로 설정 */
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

/**
 * 헤더가 fixed로 되어 있기 때문에 페이지의 컨텐츠가 4rem 아래 나타나도록 해주는 컴포넌트
 */
const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;
const LevelInfo = styled.div`
  font-weight: 800;
  margin-right: 0.5rem;
`;

const LinkTo = styled(Link)`
  color: black;
  font-style: oblique;
  &:hover{
    color: gray;
    text-decoration: none;
  }
`;

const Ai = styled.span`
  color : ${palette.indigo[9]};
`;

const Header = ({ user, onLogout }) => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <LinkTo to="/main" className="logo" style={{ fontSize: '1.5em'}}>
            M<Ai>AI</Ai>T
          </LinkTo>
          {user ? (
            <div className="right">
              <LevelInfo>{user.level}</LevelInfo>
              <UserInfo>{user.username}</UserInfo>
              <Button to ='/' onClick={onLogout}>로그아웃</Button>
            </div>
          ) : (
            <div className="right">
              <Button to="/login">로그인</Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
