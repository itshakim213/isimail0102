import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../styles/EmailDetailsModal.css';
import { format } from 'date-fns';

const EmailDetailsModal = ({ emailInfo, isModalOpen, handleClose }) => {
  console.log('Modal State:', isModalOpen);

  if (!isModalOpen || !emailInfo) {
    return null;
  }

  const formattedDate = format(
    new Date(emailInfo.createdAt),
    'dd/MM/yyyy HH:mm:ss',
  );

  return (
    <div className="email-details-modal-container">
      <div className="email-details-modal">
        <Typography variant="h5" className="Principal-text">
          Email Details
        </Typography>
        <div className="email-details-content">
          <Typography className="Date-details">{formattedDate}</Typography>
          <Typography className="Typography-details">
            From: {emailInfo.from?.firstname || 'N/A'}{' '}
            {emailInfo.from?.lastname || 'N/A'}
          </Typography>
          <Typography className="Typography-details">
            Email: {emailInfo.from?.email || 'N/A'}
          </Typography>
          <Typography className="Typography-details">
            Subject: {emailInfo.subject || 'N/A'}
          </Typography>
          <Typography className="Typography-details">
            Message: {emailInfo.message || 'N/A'}
          </Typography>
        </div>
        <Button onClick={() => handleClose()} className="Button-modal-close">
          Close
        </Button>
      </div>
    </div>
  );
};

export default EmailDetailsModal;
