import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import main from '../assets/ab.png';
import Logo from '../assets/Dark.png';
import '../styles/signin.css';
import FormDialog from '../components/forgotPassword';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Signin({ handleLogin }) {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      // met en place le token
      window.localStorage.setItem('token', response.data.token);
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

    try {
      const userData = await LoadUser();
      sessionStorage.setItem('user', JSON.stringify(userData));
      setIsSubmitted(true);
      alert('Connexion réussie ! Bienvenue à TalkMail');
      handleLogin();
      navigate('/mails/inbox');
    } catch (error) {
      console.log(error);
      setError(true);
      alert(
        "Une erreur est survenue lors de l'authentification. Veuillez réessayer.",
      );
    }
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
        <h1 className="sign-title-signin"> Connection</h1>
        <br></br>
        {/* {validationError && (
          <div className="validation-error">{validationError}</div>
        )} */}
        <p className="sign-description-signin"> Bienvenue !</p>
        <form onSubmit={(e) => submit(e)}>
          <div className="auth-form-signin">
            <label>E-mail :</label>
            <br></br>
            <input
              type="text"
              placeholder="Saisissez votre adresse TalkMail"
              onChange={(e) => setemail(e.target.value)}
              required
            ></input>
            <label>Mot de passe :</label>
            <br></br>
            <div className="password-input-container">
              <div
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  className="eye-icon-inner"
                />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Saisissez votre mot de passe"
                onChange={(e) => setpassword(e.target.value)}
                required
              />
            </div>

            <div className="forgot-password-link">
              <span
                className="forgot-password"
                style={{
                  color: 'spacegrey',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
                onClick={handleClickOpen}
              >
                Forgot Password?
              </span>
            </div>
            <br></br>
            <br></br>
            <Button
              btnText="Se connecter"
              onClick={submit}
              CustomClass="signin-btn"
            />
          </div>
        </form>
      </div>
      {open && (
        <div>
          <FormDialog handleClose={handleClose} />
        </div>
      )}
    </div>
  );
}
export default Signin;

// cccccc
