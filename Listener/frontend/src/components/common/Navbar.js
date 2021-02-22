import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Responsive from './Responsive';
import palette from '../../lib/style/palette'

const NavBlock = styled.div`
  position: fixed;
  width: 100%;
  z-index:1;
  background: ${palette.gray[2]};
`;

const Wrapper = styled(Responsive)`
    height: 3.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between; /* 자식 엘리먼트 사이에 여백을 최대로 설정 */
`;

const Spacer = styled.div`
  height: 0.3rem;
`;


const Navbar = () => {
    return (
        <>
        <NavBlock>
            <Wrapper>
                <Link to="/todaytr" className="logo" style={{fontSize: 0.9 + 'em'}}>
                    오늘의 운동
                </Link>
                <Link to="/" className="logo" style={{fontSize: 0.9 + 'em'}}>
                    운동 일지
                </Link>
                <Link to="/postlist" className="logo" style={{fontSize: 0.9 + 'em'}}>
                    커뮤니티
                </Link>
                <Link to="/mypage" className="logo" style={{fontSize: 0.9 + 'em'}}>
                    마이페이지
                </Link>
            </Wrapper>
        </NavBlock>
        <Spacer />
        </>
    );
};

export default Navbar;