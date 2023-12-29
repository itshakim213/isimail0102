import React, { useState } from 'react';
import Button from '../components/Button';
import '../styles/Newmessage.css';
import axios from 'axios';

function Newmessage() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  async function submitForm(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      await axios.post(
        'http://localhost:4001/api/newmessage',
        {
          to,
          subject,
          message,
          // Assurez-vous que attachmentId est défini ou retiré de la requête si non utilisé
          // attachmentId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // Réinitialisation des champs après l'envoi
      setTo('');
      setSubject('');
      setMessage('');
      // Réinitialiser attachmentId si utilisé
      // setAttachmentId('');
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
    }
  }

  return (
    <body>
      <form className="form-sendMsg" onSubmit={submitForm}>
        <br></br>
        <p className="mail-send">Let's send an email</p>
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
