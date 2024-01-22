import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/SideBarPage.css';
import Button from '../components/Button';
import SearchChat from './SearchChat';
import noConver from '../assets/noConvers.png';
import Empty from './Empty';
import NewMessage from '../components/Newmessage';
import '../styles/mails.css';
import SideBarButton from './SideBarButton';

<<<<<<< HEAD
function SideBarPage({ elements, path, showNewMessage, showNewMessageForm,onElementClick }) {
  const handleElementClick = (element) => {
    if (onElementClick) {
      onElementClick(element);
    }
  }
=======
function SideBarPage({
  elements,
  path,
  showNewMessage,
  showNewMessageForm,
  setCurrentMailBox,
}) {
>>>>>>> f0041a8df519c5c28d52007d686264332981636c
  return (
    <div className="side-bar-page">
      {path === 'mails' && (
        <SideBarButton text="Nouveau Message" onClick={showNewMessageForm} />
      )}
      {path === 'chats' && <SearchChat />}
      {(path === 'chats' || elements.length === 0) && !showNewMessage ? (
        <Empty
          image={noConver}
          message="you have no contact"
          width={85}
          height={85}
        />
      ) : (
          <nav style={{ marginTop: 65 }}>
            {elements.map((item, index) => (
<<<<<<< HEAD
              <div key={`${index}-${item}`} onClick={() => handleElementClick(item)} className="nav-item">
              {item}
            </div>
            ))}
          </nav>
        </div>

        )}
=======
              <NavLink
                to={`/${path}/${item}`}
                key={`${index}-${item}`}
                className="nav-item"
                onClick={() => setCurrentMailBox(item)}
              >
                {item}
              </NavLink>
            ))}
          </nav>
        // <nav style={{ marginTop: '.5rem' }}>
        //   {elements.map((item, index) => (
        //     <NavLink
        //       to={`/${path}/${item}`}
        //       key={`${index}-${item}`}
        //       className="nav-item"
        //     >
        //       {item.replace(/_/g, ' ')}
        //     </NavLink>
        //   ))}
        // </nav>
      )}
>>>>>>> f0041a8df519c5c28d52007d686264332981636c

      {path === 'chats' && !showNewMessage && (
        <SideBarButton text="Ajouter Conversation" />
      )}
    </div>
  );
}

export default SideBarPage;
