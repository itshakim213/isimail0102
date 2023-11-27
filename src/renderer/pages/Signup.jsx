import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div>
      <h1>Signup page</h1>
      <Link to="/chats">Chats Link</Link>
    </div>
  );
}

export default Signup;
