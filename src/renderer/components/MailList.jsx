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
// import { useQuery } from 'react-query';

function MailList() {
  const [mails, setMails] = useState([]);

  const fetchMails = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        'http://localhost:4001/api/newmessage',
        config,
      );
      setMails(response.data);
    } catch (error) {
      console.error('alert error', error);
    }
  };

  useEffect(() => {
    fetchMails();
  }, []);

// function MailList ()  {
//   async function fetchMails() {
//     try {
//       const token = localStorage.getItem('token');
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const response = await axios.get(
//         'http://localhost:4001/api/newmessage',
//         config,
//       );
//       return response.data;
//     } catch (error) {
//       throw new Error('Failed to fetch mails');
//     }
//   }
//   const { data: mails, isLoading, isError } = useQuery('mails', fetchMails);
//   if (isLoading) {
//     return <p>Chargement en cours</p>;
//   }
//   if (isError) {
//     return <p>Erreur lors du chargement des mails</p>;
//   }


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
            {mails.map((mail) => (
              <TableRow key={mail._id}>
                <TableCell component="th" scope="row">
                  {mail.user[0].firstname} {mail.user[0].lastname}
                </TableCell>
                <TableCell align="right">{mail.user[0].email}</TableCell>
                <TableCell align="right">{mail.subject}</TableCell>
                <TableCell align="right">{mail.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MailList;