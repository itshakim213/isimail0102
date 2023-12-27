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
      await axios.post('http://localhost:4001/api/newmessage', {
        to,
        subject,
        message,
        // Assurez-vous que attachmentId est défini ou retiré de la requête si non utilisé
        // attachmentId,
      });
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
