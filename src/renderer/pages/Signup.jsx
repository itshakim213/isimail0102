import React, { useState } from 'react';
import Button from '../components/Button';
import Img from '../assets/cc.png';
import Logo from '../assets/Dark.png';
import '../styles/signup.css';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className="signup-container">
      <div className="left-section">
        <div className="logo-signup">
          <Link to="/index.html">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="img-signup">
          <img src={Img} alt="signup-img"></img>
        </div>
      </div>
      <div className="right-section">
        <h1 className="sign-title">Sign up</h1>
        <br></br>
        <p className="sign-description">
          Let's begin your journey with TalkMail
        </p>
        <br></br>
        <form>
          <div className="auth-form">
            <label>Firstname :</label>
            <input
              type="text"
              placeholder="enter your firstname"
              required
            ></input>
            <br></br>
            <label>Lastname : </label>

            <input type="text" placeholder="enter your lastname"></input>
            <br></br>
            <label>Date of birth: </label>
            <input type="date" placeholder="enter your date of birth"></input>
            <br></br>

            <label>Email address: </label>
            <input type="email" placeholder="enter your email address"></input>
            <br></br>
            <label>Password :</label>
            <input type="password" placeholder="enter your password"></input>
            <br></br>
            <br></br>
            <br></br>
            <Button CustomClass="signup-btn" btnText="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
