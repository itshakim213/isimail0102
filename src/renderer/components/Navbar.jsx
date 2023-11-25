import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../assets/Logo.png';
import "../styles/Navbar.css";
import Button from '../components/Button'; // Assurez-vous que votre composant Button est correctement défini

function Navbar() {
  return (
    <div className='navbar'>
      <div className='logo'>
        <Link to="/index.html">
         <img src={Logo} alt='light-mode' />
        </Link>
      </div>
      <nav className='btn-link'>
        <ul>
          <li>
              <Button btnLink="/signin" btnText="Sign in" CustomClass="button-link2" />
          </li>
          <li>
              <Button btnLink="/signup" btnText="Create account" CustomClass="button-link1" />
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Navbar;
