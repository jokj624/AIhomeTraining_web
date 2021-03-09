import React from "react";
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <div className="mt-5 pt-5 pb-5 footer">
    <div className="container">
      <div className="row">
        <div className="col-lg-5 col-xs-12 about-company">
          <h2 style={{fontStyle: 'oblique', fontWeight:'bold'}}>My AI Trainer</h2>
          <p className="pr-3">당신만의 Personal Trainer가 되어드립니다.<br/>지금 바로 운동을 시작하고 당신의 자세를 분석해보세요.</p>
        </div>
        <div className="col-lg-3 col-xs-12 links">
          <h4 className="mt-lg-0 mt-sm-3"><i className="fa fa-link mr-3"></i>Quick Links</h4>
            <ul className="m-0 p-0">
              <li>- <Link to="/todaytr">오늘의 운동</Link></li>
              <li>- <Link to="/calendar">운동 일지</Link></li>
              <li>- <Link to="/postlist">커뮤니티</Link></li>
              <li>- <Link to="/mypage">마이 페이지</Link></li>
            </ul><p></p>
        </div>
        <div className="col-lg-4 col-xs-12 location">
          <h4 className="mt-lg-0 mt-sm-4"><i className="fa fa-user-tie mr-3"></i> Contact Us!</h4>
          <p>서울시 용산구 청파로 47길 100 숙명여자대학교</p>
          <p className="mb-0"><i className="fa fa-phone mr-3"></i>(02) 123-4567</p>
          <p className="mb-0"><i className="fa fa-envelope mr-3"></i>listener@gmail.com</p>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col copyright">
            <h4 className="mt-lg-0 mt-sm-4 developer">‍<i class="fas fa-code"></i> Developers</h4>
            <p className="m-1 p-1">
                <span className="dev"><a href = "https://github.com/jokj624"><i className="fab fa-github-square mr-3"></i></a> 채정아</span> 
                <span className="dev"><a href = "https://github.com/coolkim99"><i className="fab fa-github-square mr-3"></i></a> 김시원</span>
                <span className="dev"><a href = "https://github.com/EunHye146"><i className="fab fa-github-square mr-3"></i></a> 주은혜</span>
            </p>
          <p></p>
          <p>© 2021. All Rights Reserved.<br/> <a href="https://github.com/jokj624/AIhomeTraining_web" style={{color:'#616161'}}>HomeTraining's Github</a></p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Footer;