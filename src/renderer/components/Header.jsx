import '../styles/Header.css';
import { Link, useNavigate } from 'react-router-dom';
import share from '../assets/share.png';
import notification from '../assets/notification.png';

function Header({ handleLogout }) {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const navigate = useNavigate();

  const hadnleLogoutClick = () => {
    handleLogout();
    navigate('/index.html');
  };

  return (
    <header>
      <p className="user-session">
        {user && `${user.firstname} ${user.lastname}`}
      </p>
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
          <Link to="/index.html" onClick={hadnleLogoutClick}>
            <img src={share} alt="share-icon" width={32} height={32} />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
