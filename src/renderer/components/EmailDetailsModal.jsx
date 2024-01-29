import React from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../styles/EmailDetailsModal.css';
import { format } from 'date-fns';

const EmailDetailsModal = ({
  emailInfo,
  isModalOpen,
  handleClose,
  showNewMessage,
  setReply,
  setShowNewMessage,
  setFwd,
}) => {

  const mailbox = useParams()
  console.log(mailbox.category)
  console.log(emailInfo)
  console.log('Modal State:', isModalOpen);

  if (!isModalOpen || !emailInfo) {
    return null;
  }

  const formattedDate = format(
    new Date(emailInfo.createdAt),
    'dd/MM/yyyy HH:mm:ss',
  );

  const handleReply = () => {
    setReply(emailInfo);
    setShowNewMessage(true);
    console.log(showNewMessage);
  };

  const handleForward = () => {
    console.log('Forward button clicked');
    setFwd(emailInfo);
    setShowNewMessage(true);
  };

  return (
    <div className="email-details-modal-container">
      <div className="email-details-modal">
        <Typography variant="h5" className="Principal-text">
          Email Details
        </Typography>
        <div className="email-details-content">
          <Typography className="Date-details">{formattedDate}</Typography>
          <div className="typography-details-container">
          <Typography className="Typography-details">
            {
              (mailbox.category !== 'outbox') ? 
                `From: ${emailInfo.from?.firstname || 'N/A'}
                ${emailInfo.from?.lastname || 'N/A'}`
               : 
                `To: ${emailInfo.to?.firstname || 'N/A'}
                ${emailInfo.to?.lastname || 'N/A'}`
              
            }
          </Typography>
          <Typography className="Typography-details">
            Email: {emailInfo.from?.email || 'N/A'}
          </Typography>
          <Typography className="Typography-details">
            Subject: {emailInfo.subject || 'N/A'}
          </Typography>
          </div>
          <img className='send-rec-pic' src={emailInfo.from?.pic} alt='send-pic' height={75} width={75} />
        </div>

        <div className="message-container">
        <Typography className="Typography-detail-message">
          {emailInfo.message || 'N/A'}
        </Typography>
        </div>
        <div className="button-container-mail">
          <Button onClick={handleReply} className="Button-modal">
            Répondre
          </Button>
          <Button onClick={handleForward} className="Button-modal">
            Transférer
          </Button>
        </div>
        <Button onClick={() => handleClose()} className="Button-modal-close">
          Close
        </Button>
      </div>
    </div>
  );
};

export default EmailDetailsModal;