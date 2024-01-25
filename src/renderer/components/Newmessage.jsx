import React, { useState } from 'react';
import Button from '../components/Button';
import '../styles/Newmessage.css';
import axios from 'axios';

function Newmessage() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  // const [attachments, setAttachments] = useState([]);

  // const handleFileChange = (e) => {
  //   setAttachments(e.target.files);
  // };

  async function submitForm(e) {
    e.preventDefault();

    try {
      // const token = localStorage.getItem('token');
      const user = JSON.parse(sessionStorage.getItem('user'));

      // const formData = new FormData();
      // formData.append('to', to);
      // formData.append('subject', subject);
      // formData.append('message', message);

      // Log user token
      console.log('User Token:', user.token);

      const response = await axios.post(
        'http://localhost:4001/api/mail/sendemail',
        // formData,
        {
          to,
          subject,
          message,
          // attachments,
          // formData,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-type': 'application/json',
            // 'Content-type': 'multipart/form-data',
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
      // setAttachments([]);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      if (error.response) {
        console.error('Server respons Data:', error.response.data);
      }
    }
  }

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
        <textarea
          className="textarea-sendMsg"
          placeholder="Message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        {/* <input type="file" onChange={(e) => handleFileChange(e)} multiple /> */}
        {/* <input type="file" onChange={(e) => setAttachment(e.target.files[0])} /> */}
        <Button btnText="Submit" />
        {/* <Button btnText="Draft" onClick={saveDraft} /> */}
      </form>
    </body>
  );
}

export default Newmessage;
