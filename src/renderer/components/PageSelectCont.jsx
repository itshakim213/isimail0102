import Empty from './Empty';
import noSelect from '../assets/noSelected.png';
import Newmessage from './Newmessage';
import '../styles/PageSelectCont.css';
// import ComposeMail from './ComposeMail';
// import { useState } from 'react';

function PageSelectCont({ message, showNewMessage, showNewMessageForm }) {
  // const [openComposeMailDialog, setOpenComposeMailDialog] = useState(false);

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
        // <ComposeMail
        //   openDialog={openComposeMailDialog}
        //   setOpenDialog={setOpenComposeMailDialog}
        // />
      ) : (
        <Empty image={noSelect} message={message} width={180} height={180} />
      )}
    </div>
  );
}
export default PageSelectCont;
