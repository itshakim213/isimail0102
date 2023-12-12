import React from 'react';
import SideBarPage from '../components/SideBarPage';
import PageList from '../components/PageList';
import PageSelectCont from '../components/PageSelectCont';

function Files() {
  let elems = [
    'Boite_de_reception',
    "Boite_d'envoie",
    'Brouillons',
    'Favoris',
    'Spam',
    'Courbeille',
  ];
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
      <SideBarPage elements={elems} path="files" />
      <PageList />
      <PageSelectCont message="select file to read" />
    </div>
  );
}

export default Files;
