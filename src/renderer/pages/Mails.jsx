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
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const showNewMessageForm = () => {
    setShowNewMessage(!showNewMessage);
  };

  const showNewMailList = () => {
    setShowNewMail(!showNewMail);
  };

  const openEmailModal = (email) => {
    setSelectedEmail(email);
    setIsEmailModalOpen(true);
  };

  const closeEmailModal = () => {
    setIsEmailModalOpen(false);
    setSelectedEmail(null);
  };

  const user = JSON.parse(sessionStorage.getItem('user'));

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
      <MailList
        currentMailBox={currentMailBox}
        openEmailModal={openEmailModal}
      />
      <PageSelectCont
        message="select mail to read"
        showNewMessage={showNewMessage}
        selectedEmail={selectedEmail}
        isEmailModalOpen={isEmailModalOpen}
        closeEmailModal={closeEmailModal}
      />
    </div>
  );
}

export default Mails;
