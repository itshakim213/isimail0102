import React from 'react';
import SideBarPage from '../components/SideBarPage';

function Files() {
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
    </div>
  );
}

export default Files;
