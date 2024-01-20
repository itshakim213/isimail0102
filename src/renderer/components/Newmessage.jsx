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
      // const token = localStorage.getItem('token');
      const user = JSON.parse(sessionStorage.getItem('user'));

      // Log user token
      console.log('User Token:', user.token);

      const response = await axios.post(
        'http://localhost:4001/api/mail/sendemail',
        // 'http://localhost:4001/api/newmessage',
        {
          to,
          subject,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      console.log('Server Response:', response.data);
      console.log(to);
      console.log(subject);
      console.log(message);
      // Réinitialisation des champs après l'envoi
      setTo('');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);

      // Log the specific response data from the server (if available)
      if (error.response) {
        console.error('Server Response Data:', error.response.data);
      }
    }
  }

  return (
    <body>
      <form className="form-sendMsg" onSubmit={submitForm}>
        <br></br>
        <p className="mail-send">{ (subject === '') ? 'new mail' : `${subject}` }</p>
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
        {/* <input type="file" onChange={(e) => setAttachment(e.target.files[0])} /> */}
        <Button btnText="Submit" />
        {/* <Button btnText="Draft" onClick={saveDraft} /> */}
      </form>
    </body>
  );
}

export default Newmessage;
