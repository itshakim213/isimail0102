import React, { useState } from 'react';
import Button from '../components/Button';
import main from '../assets/ab.png';
import Logo from '../assets/Dark.png';
import '../styles/signin.css';
import { Link } from 'react-router-dom';

function Signin() {
  return (
    <div className="signin-container">
      <div className="left-section-signin">
        <div className="logo-signup">
          <Link to="/index.html">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="img-signin">
          <img src={main} alt="signin-img"></img>
        </div>
      </div>
      <div className="right-section-signin">
        <h1 className="sign-title-signin">Sign in</h1>
        <br></br>
        <p className="sign-description-signin">Welcome Back !</p>
        <form>
          <div className="auth-form-signin">
            <label>E-mail:</label>
            <br></br>
            <input type="text" placeholder="enter you email address"></input>
            <br></br>
            <label>Password:</label>
            <br></br>
            <input type="text" placeholder="enter your passeword"></input>
            <br></br>
            <br></br>
            <Button btnText="Submit" CustomClass="signin-btn" />
          </div>
        </form>
      </div>
    </div>
  );
}
export default Signin;
