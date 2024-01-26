import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useState } from 'react';

function FormDialog({ handleClickOpen, handleClose }) {
  const [email, setEmail] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const answerQst = async () => {
    console.log(
      'Submitting request with email:',
      email,
      'and security answer:',
      securityAnswer,
    );

    try {
      const resp = await axios.post(
        'http://localhost:4001/api/user/forgot',
        {
          email: email,
          securityAnswer: securityAnswer,
        },
        {
          headers: {
            'Content-type': 'application/json',
          },
        },
      );
      console.log('Response from server -- successsss:', resp.data);

      // If security answer is correct, proceed with password reset
      const resetResp = await axios.post(
        'http://localhost:4001/api/user/reset',
        {
          email: email,
          newPassword: newPassword,
        },
        {
          headers: {
            'Content-type': 'application/json',
          },
        },
      );
      // return resp.data;
      console.log('Password reset response from server:', resetResp.data);
      return resetResp.data;
    } catch (error) {
      console.error('Error from server:', error);
      throw error; // Rethrow the error for the onError callback
    }
  };

  const { mutate } = useMutation(answerQst, {
    onSuccess: (response) => {
      console.log('Response from server -- success:', response);
      if (response && response.message) {
        console.log('Message from server:', response.message);
      } else {
        console.log('Unexpected response structure:', response);
      }
    },
    onError: (error) => {
      console.error('Error from server:', error);
    },
  });

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: async (event) => {
            event.preventDefault();
            try {
              const response = await mutate();
              console.log('Mutation completed successfully');
            } catch (error) {
              console.error('Error during mutation:', error);
            }
            handleClose();
          },
        }}
      >
        <DialogTitle>Reinitialisation de mot de passe :</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pour confirmer votre identité, veuillez introduire votre Email et
            répondre à cette question de sécurité, puis saisir un nouveau mot de
            passe
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Adresse mail"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="securityAnswer"
            label="Votre réponse"
            type="text"
            fullWidth
            variant="standard"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            id="newPassword"
            name="newPassword"
            label="Nouveau mot de passe"
            type="password"
            fullWidth
            variant="standard"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">OK</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default FormDialog;
