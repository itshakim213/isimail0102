import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Button from '../components/Button';
import Img from '../assets/signup-img.png';
import Logo from '../assets/Dark.png';
import '../styles/signup.css';
import { Link, useNavigate } from 'react-router-dom';

function Signup({ handleLogin }) {
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [dateofbirth, setdateofbirth] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // if (password.length < 8 || !/[A-Z]/.test(password)) {
  //   toast.error(
  //     'Le mot de passe doit contenir au moins 8 caractères avec au moins une majuscule.',
  //   );
  //   setLoading(false);
  //   return;
  // }

  const [pic, setpic] = useState(
    'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
  );
  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      setLoading(false);
      return;
    }
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'isinnovate');
      data.append('cloud_name', 'dcdmnv6uy');
      fetch('https://api.cloudinary.com/v1_1/dcdmnv6uy/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setpic(data.url.toString());
          setLoading(false);
          console.log(data.url.toString());
          //pour l'afficher egalement dans signin
          localStorage.setItem('profilePicture', data.url.toString());
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
      return;
    }
  };

  async function addUser() {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const response = await axios.post(
        'http://localhost:4001/api/user',
        {
          firstname,
          lastname,
          dateofbirth,
          email,
          password,
          // secureMail,
          securityQuestion,
          securityAnswer,
          pic,
        },
        config,
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  async function submit(e) {
    e.preventDefault();
    setError(false); // Reset error before submission
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas.');
      return;
    }

    const userDataPromise = addUser();

    userDataPromise
      .then((userData) => {
        sessionStorage.setItem('user', JSON.stringify(userData));
        const userItem = JSON.parse(sessionStorage.getItem('user'));
        setIsSubmitted(true);

        toast.success('Inscription réussie ! Bienvenue a Talkmail', {
          onClose: () => {
            console.log(userItem);
            handleLogin();
            navigate('/mails/inbox');
          },
        });
      })
      .catch((error) => {
        console.error(error);
        setError(true); // Set error if API call fails
        toast.error('Veuillez remplir tous les champs.');
        setLoading(false);
      });
  }

  useEffect(() => {
    if (isSubmitted) {
      setfirstname('');
      setlastname('');
      setdateofbirth('');
      setemail('');
      setpassword('');
      setSecurityAnswer('');
      setpic('');
    }
  }, [isSubmitted]);

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
        <h1 className="sign-title-signin">Inscription</h1>
        <br></br>
        <p className="sign-description-signup">
          Let's begin your journey with TalkMail
        </p>
        <br></br>
        <form>
          <div className="auth-form-signup">
            <input
              className="input-style"
              type="text"
              placeholder="Entrez votre prénom"
              required
              value={firstname}
              onChange={(e) => setfirstname(e.target.value)}
            ></input>

            <input
              className="input-style"
              type="text"
              placeholder="Entrez votre nom"
              value={lastname}
              onChange={(e) => setlastname(e.target.value)}
            ></input>
            <input
              className="input-style"
              type="date"
              placeholder="enter your date of birth"
              value={dateofbirth}
              onChange={(e) => setdateofbirth(e.target.value)}
            ></input>
            <input
              className="input-style"
              type="email"
              placeholder="Entrez votre talkmail email "
              value={email}
              onChange={(e) => setemail(e.target.value)}
            ></input>
            <br></br>
            <input
              className="input-style"
              type="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            ></input>
            <input
              className="input-style"
              type="password"
              placeholder="Confirmez votre mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
            <br></br>
            <select
              className="input-style"
              required
              value={securityQuestion}
              onChange={(e) => setSecurityQuestion(e.target.value)}
            >
              <option value="">Choisissez une question</option>
              <option value="Quel est le nom de votre premier animal de compagnie ?">
                Quel est le nom de votre premier animal de compagnie ?
              </option>
              <option value="Quel est le nom de votre ensegniant préferé ?">
                Quel est le nom de votre ensegniant préferé ?
              </option>
              <option value="Quel est l'adresse de votre maison d'enfance ?">
                Quel est l'adresse de votre maison d'enfance ?
              </option>
            </select>
            <br></br>
            <input
              className="input-style"
              type="text"
              placeholder="enter your security question answer"
              required
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
            ></input>
            <br></br>
            <input
              className="file-input-style"
              placeholder="Charger votre photo de profil"
              type="file"
              p={1.5}
              accept="image/*"
              onChange={(e) => postDetails(e.target.files[0])}
            />
            <br></br>
            <br></br>
            <Button
              CustomClass="signup-btn"
              disabled={loading}
              btnText={loading ? 'Signing Up...' : 'Submit'}
              onClick={submit}
            />
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
