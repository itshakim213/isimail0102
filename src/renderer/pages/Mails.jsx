import React from 'react';
import SideBarPage from '../components/SideBarPage';
import MailsList from '../components/MailsList';
import { useParams } from 'react-router-dom';

function Mails() {
  let elems = [
    'Boite de reception',
    "Boite d'envoie",
    'Brouillons',
    'Favoris',
    'Spam',
    'Courbeille',
  ];
  return (
    <div>
      <SideBarPage elements={elems} />
      <MailsList />
    </div>
  );
}

export default Mails;
