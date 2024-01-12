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
function SideBarPage({ elements, path, showNewMessage, showNewMessageForm,onElementClick}) {
  const handleElementClick = (element) => {
    if (onElementClick) {
      onElementClick(element);
    }
  }
=======
function SideBarPage({ elements, path, showNewMessage, showNewMessageForm }) {
>>>>>>> 22729ff27e709bd503b144d9878c537fc132efc2
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
        <div className="side-bar-page">
          <nav style={{ marginTop: 65 }}>
            {elements.map((item, index) => (
              <NavLink
                to={`/${path}/${item}`}
                key={`${index}-${item}`}
                className="nav-item"
              >
                {item}
              </NavLink>
            ))}
          </nav>
        </div>
<<<<<<< HEAD

        )}
=======
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
>>>>>>> 22729ff27e709bd503b144d9878c537fc132efc2

      {path === 'chats' && !showNewMessage && (
        <SideBarButton text="Ajouter Conversation" />
      )}
    </div>
  );
}

export default SideBarPage;
