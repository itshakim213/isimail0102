import Empty from './Empty';
import noSelect from '../assets/noSelected.png';
import Newmessage from './Newmessage';
import '../styles/PageSelectCont.css';

function PageSelectCont({ message, showNewMessage, showNewMessageForm }) {
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
        <Empty image={noSelect} message={message} width={180} height={180} />
      )}
    </div>
  );
}
export default PageSelectCont;
