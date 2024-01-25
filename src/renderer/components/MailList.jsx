import React, { useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../styles/mailist.css';
import { useQuery } from 'react-query';

function MailList({ currentMailBox, openEmailModal }) {
  const mailboxFetch = currentMailBox || 'inbox';
  const [selectedEmail, setSelectedEmail] = useState(null);

  const {
    data: mails,
    isLoading,
    isError,
  } = useQuery(['mails', mailboxFetch], fetchMails);

  async function fetchMails() {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const response = await axios.get(
        `http://localhost:4001/api/retrieve/retrievemails/${user._id}`,
        {
          params: {
            mailbox: mailboxFetch,
          },
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      return Array.isArray(response.data[mailboxFetch])
        ? response.data[mailboxFetch]
        : [];
    } catch (error) {
      console.error('Error fetching mails:', error);
      throw error;
    }
  }

  const handleRowClick = (email) => {
    console.log('avant de cliquer sur un email');
    openEmailModal(email);
    console.log('apres avoir cliquer sur un email');
  };

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (isError) {
    return <div>Erreur lors du chargement des mails</div>;
  }

  return (
    <div className="mail-item" style={{ overflowY: 'auto', height: '100%' }}>
      <p className="mail-send">Mails reçus:</p>
      <TableContainer className="mailist-container" component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>De</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Objet</TableCell>
              <TableCell align="right">Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mails?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Aucun mail disponible
                </TableCell>
              </TableRow>
            ) : (
              mails.map((mail) => (
                <TableRow key={mail._id} onClick={() => handleRowClick(mail)}>
                  <TableCell component="th" scope="row">
                    {mail.from
                      ? `${mail.from.firstname || 'N/A'} ${
                          mail.from.lastname || ''
                        }`
                      : 'N/A'}
                  </TableCell>
                  <TableCell align="right">
                    {mail.from ? mail.from.email || 'N/A' : 'N/A'}
                  </TableCell>
                  <TableCell align="right">{mail.subject || 'N/A'}</TableCell>
                  <TableCell align="right">{mail.message || 'N/A'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MailList;
