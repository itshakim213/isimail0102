import React from 'react';
import {
  Dialog,
  Box,
  Typography,
  styled,
  InputBase,
  TextField,
  Button,
} from '@mui/material';
import { Close, DeleteOutlined } from '@mui/icons-material';

const dialogStyle = {
  height: '90%',
  width: '80%',
  maxHeight: '100%',
  maxWidth: '100%',
  boxShadow: 'none',
  borderRadius: '10px 10px 0 0',
};

const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 15px',
  background: '#f2f6fc',
  '& > p': {
    fontSize: 14,
    fontWeight: 600,
  },
});

const ReceipientsWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  padding: '0 15px',
  '& > div': {
    fontSize: 14,
    borderBottom: '1px solid #F5F5F5',
    marginTop: 10,
  },
});

const Footer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '40px 15px',
});

const SendButton = styled(Button)({
  background: '#0B57D0',
  color: '#fff',
  fontWeight: 500,
  textTransform: 'none',
  borderRadius: 18,
  width: 100,
});

const ComposeMail = ({ openDialog, setOpenDialog }) => {
  const config = {
    Host: 'smtp.elasticemail.com',
    Username: 'testtalkmail@yopmail.com',
    Password: '7C5D787BFE2E4940660D8F72C2659BA8E402',
    Port: '2525',
  };

  const closeComposeMail = (e) => {
    e.preventDefault();
    setOpenDialog(false);
  };

  const sendMail = (e) => {
    e.preventDefault();

    // Assuming you have variables From and Body defined somewhere
    if (window.Email) {
      window.Email.send({
        ...config,
        To: From,
        Subject: Body,
      }).then((message) => alert(message));
    }
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} PaperProps={{ sx: dialogStyle }}>
      <Header>
        <Typography>New mail</Typography>
        <Close fontSize="small" onClick={(e) => closeComposeMail(e)} />
      </Header>
      <ReceipientsWrapper>
        <InputBase placeholder="from" />
        <InputBase placeholder="to" />
        <InputBase placeholder="Subjects" />
      </ReceipientsWrapper>
      <TextField
        multiline
        inputProps={{ rows: 20 }} // Use inputProps to set rows
        sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
      />
      <Footer>
        <SendButton onClick={(e) => sendMail(e)}>Send</SendButton>
        <DeleteOutlined onClick={() => setOpenDialog(false)} />
      </Footer>
    </Dialog>
  );
};

export default ComposeMail;
