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
  setShowNewMessage,
  setReply,
  reply,
  fwd,
  setFwd,
}) {
  // const [isReplying, setIsReplying] = useState(false);

  // const [reply, setReply] = useState(null);

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
        <Newmessage reply={reply} fwd={fwd} />
      ) : (
        <>
          {selectedEmail ? (
            <EmailDetailsModal
              emailInfo={selectedEmail}
              isModalOpen={isEmailModalOpen}
              handleClose={closeEmailModal}
              setReply={setReply}
              setShowNewMessage={setShowNewMessage}
              setFwd={setFwd}
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
