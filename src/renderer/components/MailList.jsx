import React, { useState, useEffect } from 'react';
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

function MailList({ currentMailBox }) {
  const mailboxFetch = currentMailBox || 'inbox';
  console.log('Current Mailbox:', currentMailBox);

  // loading et error state de query react hoook
  const { data: mails, isLoading, isError } = useQuery('mails', fetchMails);
  async function fetchMails() {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      // recupérer le token de l'authentificatio de local storage
      // const token = localStorage.getItem('token');
      // get req depuis l API
      const response = await axios.get(
        `http://localhost:4001/api/retrieve/retrievemails/${user._id}`,
        {
          params: {
            mailbox: mailboxFetch,
            // , 'outbox', 'starred', 'important', 'bin'
          },
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      console.log('Current Mailbox:', mailboxFetch);
      console.log(response.data);

      // assurer que data est array
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching mails:', error);
      throw error; // error React Query
    }
  }

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (isError) {
    return <div>Erreur lors du chargement des mails</div>;
  }
  console.log({ mails });

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
                <TableRow key={mail._id}>
                  <TableCell component="th" scope="row">
                    {mail.from
                      ? `${mail.from.firstname} ${mail.from.lastname}`
                      : 'N/A'}
                  </TableCell>
                  <TableCell align="right">
                    {mail.from ? mail.from.email : 'N/A'}
                  </TableCell>
                  <TableCell align="right">{mail.subject}</TableCell>
                  <TableCell align="right">{mail.message}</TableCell>
                </TableRow>
              ))
            )}
            {/* {mails.map((mail) => (
              <TableRow key={mail._id}>
                <TableCell component="th" scope="row">
                  {mail.user[0].firstname} {mail.user[0].lastname}
                </TableCell>
                <TableCell align="right">{mail.user[0].email}</TableCell>
                <TableCell align="right">{mail.subject}</TableCell>
                <TableCell align="right">{mail.message}</TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MailList;
