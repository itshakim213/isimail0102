import React, { useState, useEffect } from 'react';
import '../styles/AccountSettingsForm.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AccountSettingsForm({ email, handleLogout }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    const confirmLogout = window.confirm(
      'Voulez vous vraimant vous déconnecter ?',
    );
    if (confirmLogout) {
      handleLogout();
      navigate('/index.html');
    }
  };

  const handleSubmit = async () => {
    if (newPassword !== confirmNewPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const response = await changePassword();
      console.log('Password change successful:', response);
    } catch (error) {
      console.error('Password change failed:', error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Voulez-vous vraiment supprimer votre compte ? Cette action est irréversible.',
    );

    if (confirmDelete) {
      try {
        const response = await deleteUser();
        console.log('User deleted', response);
        handleLogout();
        navigate('/index.html');
      } catch (error) {
        console.error('Deleting user failed', error);
      }
    }
  };

  const changePassword = async () => {
    const user = JSON.parse(sessionStorage.getItem('user'));

    try {
      const response = await axios.put(
        'http://localhost:4001/api/user/changepassword',
        {
          currentPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-type': 'application/json',
          },
        },
      );
      console.log('API Response:', response.data);
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      return response.data;
    } catch (error) {
      console.error('Password change failed:', error);

      if (error.response && error.response.status === 400) {
        alert('Ancien mot de passe incorrect. Veuillez réessayer.');
      } else {
        alert(
          "Une erreur s'est produite lors de la modification du mot de passe.",
        );
      }
    }
  };

  const deleteUser = async () => {
    const user = JSON.parse(sessionStorage.getItem('user'));

    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const response = await axios.delete(
        `http://localhost:4001/api/user/delete/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('error deleting user', error);

      throw error;
    }
  };

  useEffect(() => {
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  }, []);

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
          // onChange={handleProfilePicChange}
          // onChange={(e) => handleProfilePicChange(e)}
        />
        <button>Confirmer le changement</button>
      </div>

      <div className="setting-box">
        <label className="option">Modifier le mot de passe</label>
        <input
          type="password"
          placeholder="Ancien mot de passe"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmer le nouveau mot de passe"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        <div className="button-container">
          <button onClick={handleSubmit}>
            Enregistrer le nouveau mot de passe
          </button>
          <button className="delete-account-button" onClick={handleDelete}>
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
