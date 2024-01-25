import React, { useState } from 'react';
import '../styles/AccountSettingsForm.css';
import { Link, useNavigate } from 'react-router-dom';

function AccountSettingsForm({ email, handleLogout }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleDeleteAccount = () => {
    console.log('Compte supprimé !');
  };

  return (
    <form className="account-settings-form">
      <div className="setting-box">
        <label className="option">Changer la photo de profil</label>
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
        <button type="submit">Enregistrer le nouveau mot de passe</button>
      </div>

      <div className="setting-box">
        <label className="option">Modifier le numéro de téléphone</label>
        <input type="text" placeholder="Nouveau numéro de téléphone" />
      </div>

      <div className="setting-box">
        <label className="option">Ajouter un email de secours</label>
        <input type="email" placeholder="Adresse email de secours" />
      </div>

      <div className="setting-box">
        <label className="option">Numéro de téléphone de récupération</label>
        <input type="text" placeholder="Numéro de téléphone de récupération" />
      </div>

      <div className="setting-box">
        <button className="delete-account-button" onClick={handleDeleteAccount}>
          Supprimer le compte
        </button>
      </div>

      <div className="setting-box">
        <Link to="/index.html" onClick={handleLogoutClick}>
          <button className="logout-button">Logout</button>
        </Link>
        {/* <button className="logout-button">Logout</button> */}
      </div>
    </form>
  );
}

export default AccountSettingsForm;
