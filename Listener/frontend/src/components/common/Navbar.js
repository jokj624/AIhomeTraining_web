import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Responsive from './Responsive';
const NavBlock = styled.div`
  position: fixed;
  width: 100%;
  z-index:100;
  background: black;
`;

const Wrapper = styled(Responsive)`
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between; /* 자식 엘리먼트 사이에 여백을 최대로 설정 */
`;

const Spacer = styled.div`
  height: 0.3rem;
`;

const LinkTo = styled(Link)`
    font-size: 0.9em;
    color: white;
    font-weight: bold;
    &:hover{
        text-decoration: none;
        color: #afafaf;
    }
`;
const Navbar = () => {
    return (
        <>
        <NavBlock>
            <Wrapper>
                <LinkTo to="/todaytr" className="logo">
                    오늘의 운동
                </LinkTo>
                <LinkTo to="/calendar" className="logo">
                    운동 일지
                </LinkTo>
                <LinkTo to="/postlist" className="logo">
                    커뮤니티
                </LinkTo>
                <LinkTo to="/mypage" className="logo">
                    마이페이지
                </LinkTo>
            </Wrapper>
        </NavBlock>
        <Spacer />
        </>
    );
};

export default Navbar;
