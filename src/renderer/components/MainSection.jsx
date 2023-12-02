import React from 'react';
import Button from '../components/Button';
import Main from '../assets/home-img.png';
import '../styles/MainSection.css';

function MainSection() {
  return (
    <div className="main-section">
      <div className="text-btn">
        <h1 className="slogan">
          Empower Your Conversations with <span>TalkMail !</span> <br></br>{' '}
          Where the Chat and Email Unites <br></br>
        </h1>
        <br></br>
        <br></br>
        <Button
          btnLink="/signup"
          btnText="Get Started"
          CustomClass="button-link2"
        />
      </div>

      <div className="main-img">
        <img src={Main} alt="main-pct"></img>
      </div>
    </div>
  );
}
export default MainSection;
