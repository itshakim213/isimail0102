import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/mails.css';

function MailItem() {
  const [mails, setMails] = useState([]);

  const fetchMails = async () => {
    try {
      const response = await axios.get('http://localhost:4001/api/newmessage');
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
      <h1>Liste des mails</h1>
      <ul>
        {mails.map((mail) => (
          <li key={mail._id}>
            <p>
              De : {mail.from && mail.from.firstname}{' '}
              {mail.from && mail.from.lastname}
            </p>
            <p>Email : {mail.from && mail.from.email}</p>
            <p>Objet : {mail.subject}</p>
            <p>Message : {mail.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MailItem;
