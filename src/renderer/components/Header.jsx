import '../styles/Header.css';
import share from '../assets/share.png';
import notification from '../assets/notification.png';

function Header() {
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
          <img src={share} alt="share-icon" width={32} height={32} />
        </li>
      </ul>
    </header>
  );
}
export default Header;
