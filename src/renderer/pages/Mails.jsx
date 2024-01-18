import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SideBarPage from '../components/SideBarPage';
import PageList from '../components/PageList';
import PageSelectCont from '../components/PageSelectCont';
import MailList from '../components/MailList';

function Mails() {
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [showNewMail, setShowNewMail] = useState(false);

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
        elements={[
          <Link
            to="#"
            // onClick={showNewMailList}
            className="mail-link"
          >
            Bôite de réception
          </Link>,
          'Envoyés',
          'Important',
          'Favoris',
          'Corbeille',
          // <Link to="agenda" onClick={showNewMailList} className="mail-link">
          //   Bôite de réception test
          // </Link>,
        ]}
        path="mails"
        showNewMessageForm={showNewMessageForm}
        showNewMailList={showNewMailList}
      />
      <PageList showNewMail={showNewMail} showNewMailList={showNewMailList} />
      <PageSelectCont
        message="select mail to read"
        showNewMessage={showNewMessage}
        showNewMessageForm={showNewMessageForm}
      />
    </div>
  );
}

export default Mails;
