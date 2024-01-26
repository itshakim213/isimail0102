import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import '../styles/Newmessage.css';
import axios from 'axios';

function Newmessage({ reply, fwd }) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  async function submitForm(e) {
    e.preventDefault();

    try {
      const user = JSON.parse(sessionStorage.getItem('user'));

      // Log user token
      console.log('User Token:', user.token);

      const response = await axios.post(
        'http://localhost:4001/api/mail/sendemail',
        {
          to,
          subject,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-type': 'application/json',
          },
        },
      );

      console.log('Server response:', response.data);
      console.log(to);
      console.log(subject);
      console.log(message);
      alert(`Email sent successfully!`);
      // Réinitialisation des champs après l'envoi
      setTo('');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      if (error.response) {
        console.error('Server respons Data:', error.response.data);
      }
    }
  }

  useEffect(() => {
    if (reply !== null) {
      setTo(reply.from.email);
      setSubject(`Re : ${reply.subject}`);
      setMessage('');
      console.log(to);
    }
  }, [reply]);

  useEffect(() => {
    if (fwd !== null) {
      setTo('');
      setSubject(`FWD : ${fwd.subject}`);
      setMessage(fwd.message);
      console.log(to);
    }
  }, [fwd]);

  return (
    <body>
      <form className="form-sendMsg" onSubmit={submitForm}>
        <br></br>
        <p className="mail-send">
          {subject === '' ? 'new mail' : `${subject}`}
        </p>
        <br></br>
        <input
          className="input-sendMsg"
          type="email"
          placeholder="to"
          required
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          className="input-sendMsg"
          type="text"
          placeholder="subject"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        {/* (selectedMail !== null) ? selectedMail.subject : subject */}
        <textarea
          className="textarea-sendMsg"
          placeholder="Message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <Button btnText="Submit" />
      </form>
    </body>
  );
}

export default Newmessage;
