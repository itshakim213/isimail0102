import { NavLink, useParams } from 'react-router-dom';
import SendButton from './SendButton';
import '../styles/SideBarPage.css';

function SideBarPage({ elements }) {
  return (
    <div className="side-bar-page">
      <SendButton />
      <nav>
        {elements.map((item, index) => (
          <NavLink
            to={`/mails/${item}`}
            key={`${index}-${item}`}
            className="nav-item"
          >
            {item}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
export default SideBarPage;
