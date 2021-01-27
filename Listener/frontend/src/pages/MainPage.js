import React from 'react';
import './main.css'

function main() {
  return (
      <div className="mainpage">
        <header>
            Home Training
        </header>
        <span><button id="logout">logout</button></span>
        <nav>
            <span>오늘의 운동</span>
            <span>운동 일지</span>
            <span>마이페이지</span>
        </nav>
     </div>
  );
}
export default main;