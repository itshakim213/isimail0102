import React, { useState } from 'react';
import Button from '../components/Button';
import '../styles/Newmessage.css';
import axios from 'axios';

function Newmessage() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  //const [attachment, setAttachment] = useState(null);

  async function submitForm(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      await axios.post(
        'http://localhost:4001/api/mail/sendemail',
        {
          to,
          subject,
          message,
          // Assurez-vous que attachmentId est défini ou retiré de la requête si non utilisé
          //attachment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(to);
      console.log(subject);
      console.log(message);
      // Réinitialisation des champs après l'envoi
      setTo('');
      setSubject('');
      setMessage('');
      //setAttachment(null);
      // Réinitialiser attachmentId si utilisé
      // setAttachmentId('');
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
    }
  }
  async function saveDraft() {
    try {
      await axios.put('http://localhost:4001/api/draft', {
        //from,
        //to,
        //subject,
        //message,
        send: false, // Indique que c'est un brouillon
      });
      // Réinitialisation des champs après l'enregistrement du brouillon
      setFrom('');
      setTo('');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du brouillon ", error);
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
        <input type="file" onChange={(e) => setAttachment(e.target.files[0])} />
        <Button btnText="Submit" />
        <Button btnText="Draft" onClick={saveDraft} />
      </form>
    </body>
  );
}

export default Newmessage;
