import React, { useState } from 'react';
import SideBarPage from '../components/SideBarPage';
// import { useParams } from 'react-router-dom';
import PageList from '../components/PageList';
import PageSelectCont from '../components/PageSelectCont';

function Mails() {
  const [showNewMessage, setShowNewMessage] = useState(false);

  // Fonction pour afficher le formulaire NewMessage
  const showNewMessageForm = () => {
    if (!showNewMessage) {
      setShowNewMessage(true);
    } else {
      setShowNewMessage(false);
    }
  };

  let elems = [
    'Boite de reception',
    "Boite d'envoie",
    'Brouillons',
    'Favoris',
    'Spam',
    'Courbeille',
  ];
  async function fetchData() {
    let reponse = await fetch(`http://localhost:8000/users`)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
  fetchData();
  return (
    <div
      className="page"
      style={{
        marginTop: 68,
        marginLeft: 85,
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <SideBarPage
        elements={elems}
        path="mails"
        showNewMessage={showNewMessage}
        showNewMessageForm={showNewMessageForm}
      />
      <PageList />
      <PageSelectCont
        message="select mail to read"
        showNewMessage={showNewMessage}
        showNewMessageForm={showNewMessageForm}
      />
    </div>
  );
}

export default Mails;
