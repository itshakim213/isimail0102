import mail from '../assets/mail.png';
import file from '../assets/file.png';
import setting from '../assets/setting.png';
import calendar from '../assets/calendar.png';
import messages from '../assets/messages.png';
import { NavLink, matchPath, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';

function SideBar() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const loc = useLocation();
  return (
    <aside>
      <div className="profile">
        {' '}
        <img
          src={user.pic}
          alt="User Picture"
          width="50"
          height="50"
          style={{ borderRadius: '50', margin: '2rem 0 0.5rem' }}
        />
      </div>
      <div className="navigate">
        <ul>
          <li>
            <NavLink
              to="/mails/inbox"
              className={loc.pathname.startsWith('/mails') ? 'active' : ''}
            >
              <img src={mail} alt="mail-icon" width={25} height={25} />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/files/boite_de_reception"
              className={loc.pathname.startsWith('/files') ? 'active' : ''}
            >
              <img src={file} alt="file-icon" width={25} height={25} />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings/"
              className={loc.pathname.startsWith('/settings') ? 'active' : ''}
            >
              <img src={setting} alt="setting-icon" width={25} height={25} />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/chats"
              className={loc.pathname.startsWith('/chats') ? 'active' : ''}
            >
              <img src={messages} alt="messages-icon" width={25} height={25} />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/agenda"
              className={loc.pathname.startsWith('/agenda') ? 'active' : ''}
            >
              <img src={calendar} alt="calendar-icon" width={25} height={25} />
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}
export default SideBar;
