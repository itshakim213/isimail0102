import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SideBarPage from '../components/SideBarPage';
import PageList from '../components/PageList';
import PageSelectCont from '../components/PageSelectCont';
import MailList from '../components/MailList';

function Mails() {
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [showNewMail, setShowNewMail] = useState(false);
  const [currentMailBox, setCurrentMailBox] = useState('inbox');

  const showNewMessageForm = () => {
    setShowNewMessage(!showNewMessage);
  };

  const showNewMailList = () => {
    setShowNewMail(!showNewMail);
  };

  return (
    <div
      className="page"
      style={{
        marginLeft: 85,
        height: '100vh',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <SideBarPage
        elements={['inbox', 'outbox', 'important', 'starred', 'drafts', 'bin']}
        path="mails"
        showNewMessageForm={showNewMessageForm}
        showNewMailList={showNewMailList}
        setCurrentMailBox={setCurrentMailBox}
      />
      <PageList
        showNewMail={showNewMail}
        showNewMailList={showNewMailList}
        currentMailBox={currentMailBox}
      />
      <PageSelectCont
        message="select mail to read"
        showNewMessage={showNewMessage}
        showNewMessageForm={showNewMessageForm}
      />
    </div>
  );
}

export default Mails;
