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

function SideBarPage({
  elements,
  path,
  showNewMessage,
  showNewMessageForm,
  setCurrentMailBox,
  setCurrentSettings,
}) {
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
            <NavLink
              to={`/${path}/${item}`}
              key={`${index}-${item}`}
              className="nav-item"
              onClick={() => {
                if (path === 'settings') {
                  setCurrentSettings(item);
                } else {
                  setCurrentMailBox(item);
                }
              }}
              // onClick={
              //   () => setCurrentMailBox(item)
              //   // setCurrentSettings(item)
              // }
            >
              {item}
            </NavLink>
          ))}
        </nav>
      )}

      {path === 'chats' && !showNewMessage && (
        <SideBarButton text="Ajouter Conversation" />
      )}
    </div>
  );
}

export default SideBarPage;
