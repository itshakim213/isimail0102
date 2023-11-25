import React from 'react';
import Button from "../components/Button";
import "../styles/MainSection.css";
import main from "../assets/main.png";


function MainSection() {
  return (
    <div className='main-section'>
      <div className='text-btn'>
      <h1 className='slogan'>Empower Your Conversations with the <br></br> Magic of <span>TalkMail</span> ! </h1>
    <br></br><br></br>
        <Button btnLink="/signup" btnText="Get Started" CustomClass="button-link2"/>
      </div>

      <div className='main-img'>
        <img src={main} alt='main-pct' className='enlarge-image'></img>
      </div>
    </div>
  )
}
export default MainSection

