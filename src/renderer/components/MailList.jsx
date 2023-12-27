// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// import '../styles/mails.css';

// function MailList() {
//   const [mails, setMails] = useState([]);

//   const fetchMails = async () => {
//     try {
//       const response = await axios.get('http://localhost:4001/api/newmessage');
//       setMails(response.data);
//     } catch (error) {
//       console.error('alert error', error);
//     }
//   };

//   useEffect(() => {
//     fetchMails();
//   }, []);

//   return (
//     <div className="mail-item">
//       <h1>Mails Reçus:</h1>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//           <TableHead>
//             <TableRow>
//               <TableCell>De</TableCell>
//               <TableCell align="right">Objet</TableCell>
//               <TableCell align="right">Message</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {mails.map((mail) => (
//               <TableRow key={mail._id}>
//                 <TableCell component="th" scope="row">
//                   {mail.from && `${mail.from.firstname} ${mail.from.lastname}`}
//                 </TableCell>
//                 <TableCell align="right">
//                   {mail.from && mail.from.email}
//                 </TableCell>
//                 <TableCell align="right">{mail.subject}</TableCell>
//                 <TableCell align="right">{mail.message}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }

// export default MailList;
// MailList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

  return (
    <div className="mail-item">
      <h1>Mails Reçus:</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
                  {mail.from && `${mail.from.firstname} ${mail.from.lastname}`}
                </TableCell>
                <TableCell align="right">
                  {mail.from && mail.from.email}
                </TableCell>
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
