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
import star from '../assets/star.png';
import imp from '../assets/imp.png';
import out from '../assets/outbox.png';
import inbx from '../assets/inbox.png';
import draft from '../assets/drft.png';
import corbeille from '../assets/bin.png';
import InboxIcon from '@mui/icons-material/Inbox';
import OutboxIcon from '@mui/icons-material/Outbox';
import DrawIcon from '@mui/icons-material/Draw';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import StarRateIcon from '@mui/icons-material/StarRate';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';

function SideBarPage({
  elements,
  path,
  showNewMessage,
  showNewMessageForm,
  setCurrentMailBox,
  setCurrentSettings,
}) {
  const mailboxIcons = {
    inbox: (
      // <InboxIcon fontSize="small" color="primary" style={{ color: 'white' }} />
      <InboxIcon fontSize="small" className="icon" />
    ),
    outbox: <OutboxIcon fontSize="small" className="icon-outbox" />,
    important: (
      <CollectionsBookmarkIcon fontSize="small" className="icon-important" />
    ),
    starred: <StarRateIcon fontSize="small" className="icon-starred" />,
    drafts: <DrawIcon fontSize="small" className="icon-drafts" />,
    bin: <DeleteSweepIcon fontSize="small" className="icon-bin" />,
  };

  return (
    <div className="side-bar-page">
      {path === 'mails' && (
        <SideBarButton text="Nouveau Mail" onClick={showNewMessageForm} />
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
        <nav>
          {elements.map((item, index) => (
            <NavLink
              to={`/${path}/${item}`}
              key={`${index}-${item}`}
              className="nav-item"
              onClick={() => setCurrentMailBox(item)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              {mailboxIcons[item]}
              <span style={{ paddingLeft: '8px' }}>{item.toUpperCase()}</span>
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
