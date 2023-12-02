import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/Dark.png';
import '../styles/Navbar.css';
import Button from '../components/Button'; // Assurez-vous que votre composant Button est correctement défini

function Navbar(props) {
  const location = useLocation();
  const CustomClass = props.CustomClass || '';

  return (
    <div className={`navbar ${CustomClass}`}>
      <div className="logo">
        <Link to="/index.html">
          <img src={Logo} alt="light-mode" />
        </Link>
      </div>
      <nav className="btn-link">
        <ul className="list-btn">
          <li>
            <Button
              btnLink="/signin"
              btnText="Sign in"
              CustomClass="button-link2"
            />
          </li>
          <li>
            <Button
              btnLink="/signup"
              btnText="Create account"
              CustomClass="button-link1"
            />
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Navbar;
