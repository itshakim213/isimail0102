1 ajouter ceci au code model user :
  pic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },


2 aller dans le controler user  est changer le :


const registerUser = asyncHandler(async (req, res) => {
  // Extraction des données du corps de la requête
//ceci
  const { firstname, lastname, dateofbirth, email, password, securityAnswer,pic } =
    req.body;

  // Vérification de la présence de toutes les données nécessaires
  if (!firstname || !lastname || !dateofbirth || !email || !password) {
    res.status(400);
    throw new Error('Please enter all the fields');
  }

  // Vérification si l'utilisateur existe déjà dans la base de données
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Création de l'utilisateur dans la base de données
//ceci
  const user = await User.create({
    firstname,
    lastname,
    dateofbirth,
    email,
    password,
    pic,
    securityAnswer,
    isResettingPassword: false,
  });

//ceci
if (user) {
    res.status(201).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      dateofbirth: user.dateofbirth,
      email: user.email,
      pic: user.pic,
      securityAnswer: user.securityAnswer,
      isResettingPassword: user.isResettingPassword,
      // otp: generatedOTP, // j'ai rajouté otp ici pour le sauvegarder lors d'inscription
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Failed to create the user');
  }
});


3- aller à la page signup react  et ajouter ceci:


import React, { useState, useEffect } from 'react';
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

//ceci

  const [pic, setpic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
  const postDetails = (pics) => {
    if (pics === undefined) {
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "isinnovate");
      data.append("cloud_name", "dcdmnv6uy");
      fetch("https://api.cloudinary.com/v1_1/dcdmnv6uy/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setpic(data.url.toString());
          console.log(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  };


et ajouter ceci dans return :


<label>Email de sécurité : </label>
            <input
              type="email"
              placeholder="Entrez votre email de sécurité"
            />
            <br></br>

//ceci
            <h1>Upload your Picture</h1>
  <input
    type="file"
    p={1.5}
    accept="image/*"
    onChange={(e) => postDetails(e.target.files[0])}
  />

