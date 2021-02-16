import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer'; 
import { useSelector } from 'react-redux';
import NavContainer from '../components/common/Navbar';
import { Link } from 'react-router-dom';



const MyPage = () => {
    const { user } = useSelector(({ user }) => ({ user: user.user }));
    return (
    <div>
      <HeaderContainer />
      <NavContainer />
      <br/><br/><br/><br/><br/>
      <div>
        <div className="name">이름 {user.username}</div>
        <div className="level">등급 </div>
      </div>
      <br/><br/>
      <div>
          <Link to={`/modify/${user._id}`}>
              회원정보수정
          </Link>
      </div>
    </div>
  );
};

export default MyPage;