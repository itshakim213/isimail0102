import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import Img from '../assets/signup-img.png';
import Logo from '../assets/Dark.png';
import '../styles/signup.css';
import { Link } from 'react-router-dom';

function Signup() {
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [dateofbirth, setdateofbirth] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function submit(e) {
    e.preventDefault();

    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      await axios.post('http://localhost:4001/api/user', {
        firstname,
        lastname,
        dateofbirth,
        email,
        password,
      }, config);
      setIsSubmitted(true);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (isSubmitted) {
      setfirstname('');
      setlastname('');
      setdateofbirth('');
      setemail('');
      setpassword('');
    }
  }, [isSubmitted]);

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    // Vérifier si le '@' est présent dans la valeur saisie
    const atIndex = inputValue.indexOf('@');
    if (atIndex !== -1) {
      // Séparer la partie avant et après '@'
      const beforeAt = inputValue.substring(0, atIndex); // Partie avant '@'
      const afterAt = inputValue.substring(atIndex); // Partie après '@'
      // Si la partie avant '@' dépasse 0 caractère et la partie après '@' commence par '@talkmail'
      if (beforeAt.length > 0 && afterAt.startsWith('@talkmail')) {
        // Mettre à jour l'état email uniquement avec la partie avant '@' et '@talkmail'
        setemail(`${beforeAt}@talkmail`);
      }
    } else {
      // Si aucun '@' n'est saisi, mettre à jour l'état email normalement
      setemail(inputValue);
    }
  };
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
              value={firstname}
              onChange={(e) => setfirstname(e.target.value)}
            ></input>
            <br></br>
            <label>Lastname : </label>

            <input
              type="text"
              placeholder="enter your lastname"
              value={lastname}
              onChange={(e) => setlastname(e.target.value)}
            ></input>
            <br></br>
            <label>Date of birth: </label>
            <input
              type="date"
              placeholder="enter your date of birth"
              value={dateofbirth}
              onChange={(e) => setdateofbirth(e.target.value)}
            ></input>
            <br></br>

            <label>Email address: </label>
            <input
              type="email"
              placeholder="enter your email address"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            ></input>
            <br></br>
            <label>Password :</label>
            <input
              type="password"
              placeholder="enter your password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            ></input>
            <br></br>
            <br></br>
            <br></br>
            <Button
              CustomClass="signup-btn"
              btnText="Submit"
              onClick={submit}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
