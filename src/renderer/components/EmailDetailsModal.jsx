import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import '../styles/EmailDetailsModal.css';

const EmailDetailsModal = ({ emailInfo, isModalOpen, handleClose }) => {
  console.log('Modal State:', isModalOpen);

  if (!emailInfo) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onClose={() => handleClose()}>
      <DialogContent className="DialogContent-root">
        <Typography variant="h5" className="Typography-variantH5">
          Email Details
        </Typography>
        <DialogTitle className="DialogTitle-root">
          {emailInfo.subject}
        </DialogTitle>

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
      </DialogContent>
      <Button onClick={() => handleClose()} className="Button-close">
        {' '}
        Close
      </Button>
    </Dialog>
  );
};

export default EmailDetailsModal;
