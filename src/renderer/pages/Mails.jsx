import React from 'react';
import SideBarPage from '../components/SideBarPage';
import { useParams } from 'react-router-dom';
import PageList from '../components/PageList';
import PageSelectCont from '../components/PageSelectCont';

function Mails() {
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
      <SideBarPage elements={elems} path="mails" />
      <PageList />
      <PageSelectCont message="select mail to read" />
    </div>
  );
}

export default Mails;
