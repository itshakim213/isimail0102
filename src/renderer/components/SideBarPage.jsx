import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/SideBarPage.css';
import Button from '../components/Button';
import SearchChat from './SearchChat';
import noConver from '../assets/noConvers.png';
import Empty from './Empty';
import NewMessage from '../components/Newmessage';
import '../styles/mails.css';

function SideBarPage({ elements, path, showNewMessage, showNewMessageForm }) {
  return (
    <div className="side-bar-page">
      {path === 'mails' && (
        <Button btnText="Nouveau Message" onClick={showNewMessageForm} />
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
      )}

      {path === 'chats' && !showNewMessage && (
        <Button btnText="Ajouter Conversation" />
      )}
    </div>
  );
}

export default SideBarPage;
