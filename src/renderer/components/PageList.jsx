import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Empty from './Empty';
import noMails from '../assets/noMails.png';
import noFiles from '../assets/noFiles.png';
import noContact from '../assets/noContact.png';
import '../styles/PageList.css';
import MailItem from '../components//MailItem';
import { useEffect, useState } from 'react';

function PageList(showNewMail, showNewMailList) {
  let locat = useLocation().pathname;
  let part = locat.split('/');
  if (part[1] === 'mails') {
    return (
      <div
        className="page-list"
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 45,
        }}
      >
        {showNewMail ? (
          <MailItem />
        ) : (
          <Empty
            image={noMails}
            message="you have no mail here"
            width={290}
            height={290}
          />
        )}
      </div>
    );
  } else if (part[1] === 'files') {
    return (
      <div
        className="page-list"
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 45,
        }}
      >
        <Empty
          image={noFiles}
          message="you have no files here"
          width={290}
          height={290}
        />
      </div>
    );
  } else if (part[1] === 'chats') {
    return (
      <div
        className="page-list"
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 45,
        }}
      >
        <Empty
          image={noContact}
          message="you have no conversation"
          width={290}
          height={290}
        />
      </div>
    );
  }
}
export default PageList;
