import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import main from '../assets/ab.png';
import Logo from '../assets/Dark.png';
import '../styles/signin.css';

function Signin({ handleLogin }) {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  async function LoadUser() {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const response = await axios.post(
        'http://localhost:4001/api/user/signin',
        {
          email,
          password,
        },
        config,
      );
      return response.data;
    } catch (e) {
      console.log(e);
      setError(true);
      setemail('');
      setpassword('');
    }
  }

  async function submit(e) {
    e.preventDefault();
    setError(false);
    const LoadUserPromise = LoadUser();
    LoadUserPromise.then((userData) => {
      sessionStorage.setItem('user', JSON.stringify(userData));
      const userItem = JSON.parse(sessionStorage.getItem('user'));
      console.log(userItem);
      setIsSubmitted(true);
      alert('Connexion réussie !');
      handleLogin();
      navigate('/');
    }).catch((error) => {
      console.log(error);
      setError(true);
      alert(
        "Une erreur est survenue lors de l'authentification. Veuillez réessayer.",
      );
    });
  }

  useEffect(() => {
    if (isSubmitted) {
      setemail('');
      setpassword('');
    }
  }, [isSubmitted]);

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
        <form onSubmit={(e) => submit(e)}>
          <div className="auth-form-signin">
            <label>E-mail:</label>
            <br></br>
            <input
              type="text"
              placeholder="enter you email address"
              onChange={(e) => setemail(e.target.value)}
              required
            ></input>
            <br></br>
            <label>Password:</label>
            <br></br>
            <input
              type="password"
              placeholder="enter your passeword"
              onChange={(e) => setpassword(e.target.value)}
              required
            ></input>
            <br></br>
            <br></br>
            <Button
              btnText="Submit"
              onClick={submit}
              CustomClass="signin-btn"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
export default Signin;
