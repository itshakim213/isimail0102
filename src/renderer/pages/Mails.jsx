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

  const user = JSON.parse(sessionStorage.getItem('user'));
  console.log(user);

  let elems = [
    'Boite_de_reception',
    "Boite_d'envoie",
    'Brouillons',
    'Favoris',
    'Spam',
    'Courbeille',
  ];
  // async function fetchData() {
  //   let reponse = await fetch(`http://localhost:8000/users`)
  //     .then((response) => response.json())
  //     .then((data) => console.log(data))
  //     .catch((error) => console.error(error));
  // }
  // fetchData();
  return (
    <div
      className="page"
      style={{
        marginLeft: 85,
        height: '100vh',
        backgroundColor: '#fff',
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
