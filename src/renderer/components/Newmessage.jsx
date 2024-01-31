import React, { useState } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import '../styles/Newmessage.css';

function Newmessage() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const formData = new FormData();
      formData.append('to', to);
      formData.append('subject', subject);
      formData.append('message', message);
      formData.append('attachment', attachment); // Attach the file

      const response = await axios.post(
        'http://localhost:4001/api/mail/sendemail',
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'multipart/form-data', // Set appropriate headers for form data
          },
        },
      );

      console.log('Server response:', response.data);
      alert('Email sent successfully!');
      setTo('');
      setSubject('');
      setMessage('');
      setAttachment(null);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <form className="form-sendMsg" onSubmit={submitForm}>
      <br></br>
      <p className="mail-send">{subject === '' ? ' New mail' : `${subject}`}</p>
      <br></br>
      <input
        className="input-sendMsg"
        type="email"
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        className="input-sendMsg"
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        className="textarea-sendMsg"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <p className="PieceJointe-send">Selectionne une piece jointe</p>
      <br></br>
      <input
        type="file"
        onChange={(e) => setAttachment(e.target.files[0])} // Store the selected file
      />
      <Button btnText="Submit" />
    </form>
  );
}

export default Newmessage;
