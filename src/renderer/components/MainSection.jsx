import React from 'react';
import Button from '../components/Button';
import SignupImage from '../assets/signup.png';
import '../styles/MainSection.css';

function MainSection() {
  return (
    <div className="main-section">
      <div className="text-btn">
        <h1 className="slogan">
          Empower Your Conversations with the <br></br> Magic of{' '}
          <span>TalkMail</span> !{' '}
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
        <img src={SignupImage} alt="main-pct"></img>
      </div>
    </div>
  );
}
export default MainSection;
