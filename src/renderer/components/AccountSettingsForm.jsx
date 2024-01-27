import React, { useState } from 'react';
import '../styles/AccountSettingsForm.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AccountSettingsForm({ email, handleLogout }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [profilePic, setProfilePic] = useState('');

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/index.html');
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const updateProfilePic = async (newProfilePic) => {
    try {
      const formData = new FormData();
      formData.append('file', newProfilePic);

      const response = await axios.post(
        'URL_DU_BACKEND/pour_changer_la_photo',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      setProfilePic(response.data.newProfilePicURL);
    } catch (error) {
      console.error(
        'Erreur lors de la mise à jour de la photo de profil',
        error,
      );
    }
  };

  const handleProfilePicChange = (e) => {
    const newProfilePic = e.target.files[0];
    updateProfilePic(newProfilePic);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const response = await axios.post(
        `http://localhost:4001/api/user/reset`,
        {
          email: user.email,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      console.log(response);
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  const handleDeleteAccount = () => {
    console.log('Compte supprimé !');
    setProfilePic('');
  };

  return (
    <div className="account-settings-form">
      <div className="setting-box">
        <label className="option">Changer la photo de profil</label>
        <img
          src={
            profilePic ||
            'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
          }
          alt="Profile Pic"
          className="profile-pic"
        />
        <input
          className="file-input-style-file"
          placeholder="Charger votre photo de profil"
          type="file"
          accept="image/*"
          onChange={handleProfilePicChange}
        />
      </div>

      <div className="setting-box">
        <label className="option">Modifier le mot de passe</label>
        <input
          type="password"
          placeholder="Ancien mot de passe"
          value={oldPassword}
          onChange={handleOldPasswordChange}
        />
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
        <input
          type="password"
          placeholder="Confirmer le nouveau mot de passe"
          value={confirmNewPassword}
          onChange={handleConfirmNewPasswordChange}
        />
        <div className="button-container">
          <button onClick={handleSubmit}>
            Enregistrer le nouveau mot de passe
          </button>
          <button
            className="delete-account-button"
            onClick={handleDeleteAccount}
          >
            Supprimer le compte
          </button>
          <Link to="/index.html" onClick={handleLogoutClick}>
            <button className="logout-button">Logout</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AccountSettingsForm;
