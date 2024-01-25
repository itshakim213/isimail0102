import React from 'react';
import Empty from './Empty';
import noSelect from '../assets/noSelected.png';
import Newmessage from './Newmessage';
import EmailDetailsModal from '../components/EmailDetailsModal';
import '../styles/PageSelectCont.css';

function PageSelectCont({
  message,
  showNewMessage,
  selectedEmail,
  isEmailModalOpen,
  closeEmailModal,
}) {
  return (
    <div
      className="page-content"
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '34px 65px',
      }}
    >
      {showNewMessage ? (
        <Newmessage />
      ) : (
        <>
          {selectedEmail ? (
            <EmailDetailsModal
              emailInfo={selectedEmail}
              isModalOpen={isEmailModalOpen}
              handleClose={closeEmailModal}
            />
          ) : (
            <Empty
              image={noSelect}
              message={message}
              width={180}
              height={180}
            />
          )}
        </>
      )}
    </div>
  );
}

export default PageSelectCont;
