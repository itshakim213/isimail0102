import { NavLink, useParams } from 'react-router-dom';
import '../styles/SideBarPage.css';
import SideBarButton from './SideBarButton';
import SearchChat from './SearchChat';
import noConver from '../assets/noConvers.png';
import Empty from './Empty';

function SideBarPage({ elements, path }) {
  return (
    <div className="side-bar-page">
      {path === 'mails' && <SideBarButton text="Nouveau Message" />}
      {path === 'chats' && <SearchChat />}
      {path === 'chats' || elements.length === 0 ? (
        <Empty
          image={noConver}
          message="you have no contact"
          width={85}
          height={85}
        />
      ) : (
        <div className="side-bar-page">
          <nav style={{ marginTop: 65 }}>
            {elements.map((item, index) => (
              <NavLink
                to={`/${path}/${item}`}
                key={`${index}-${item}`}
                className="nav-item"
              >
                {item.replace(/_/g, ' ')}
              </NavLink>
            ))}
          </nav>
        </div>
      )}

      {path === 'chats' && <SideBarButton text="Ajouter Conversation" />}
    </div>
  );
}
export default SideBarPage;
