import '../styles/Header.css';
import { Link, useNavigate } from 'react-router-dom';
import share from '../assets/share.png';
import notification from '../assets/notification.png';

function Header({ handleLogout }) {
  const navigate = useNavigate();
  function logout() {
    sessionStorage.removeItem('user');
    handleLogout();
    navigate('/');
  }

  return (
    <header>
      <ul className="menu">
        <li>
          <img
            src={notification}
            alt="notification-icon"
            width={32}
            height={32}
          />
        </li>
        <li>
          <button style={{ background: 'none', border: 'none' }}>
            <img
              src={share}
              alt="share-icon"
              width={32}
              height={32}
              onClick={logout}
            />
          </button>
        </li>
      </ul>
    </header>
  );
}
export default Header;
