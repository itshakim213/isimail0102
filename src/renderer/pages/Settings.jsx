<<<<<<< HEAD

import React, { useState, useEffect } from 'react';
=======
import React from 'react';
>>>>>>> 22729ff27e709bd503b144d9878c537fc132efc2
import SideBarPage from '../components/SideBarPage';
import SettingsForm from '../components/SettingsForm';
import AccountSettingsForm from '../components/AccountSettingsForm';


function Settings() {
  let elems = [
    'Parametre Generals',
    'mohanddjouadi@gmail.com',
    'mohanddjouadi.@fgei.ummto.dz',
  ];
<<<<<<< HEAD


  useEffect(() => {
    setSelectedElement('Parametre Generals');
  }, []);

  const handleElementClick = (element) => {
    setSelectedElement(element);

  };
  // Fonction pour déterminer quel formulaire afficher en fonction de l'élément sélectionné
  const renderForm = () => {
    if (selectedElement === 'Parametre Generals') {
      return <SettingsForm />;
    } else if (selectedElement === 'samia.abbadja@fgei.ummto.dz') {
      return <AccountSettingsForm email="samia.abbadja@fgei.ummto.dz" />;
    } else if (selectedElement === 'lbiochimi45@gmail.com') {
      return <AccountSettingsForm email="lbiochimi45@gmail.com" />;
    } else if (selectedElement === 'l2informatique02@yahoo.fr') {
      return <AccountSettingsForm email="l2informatique02@yahoo.fr" />;
    }
    // Par défaut, si aucune correspondance n'est trouvée, affichez le formulaire par défaut
    return <SettingsForm />;
  };

=======
>>>>>>> 22729ff27e709bd503b144d9878c537fc132efc2
  return (
    <div
      className="page"
      style={{
        marginLeft: 85,
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
<<<<<<< HEAD
      <SideBarPage
       elements={elems} path="settings" onElementClick={handleElementClick} />

      {renderForm()}


=======
      <SideBarPage elements={elems} path="settings" />
      <SettingsForm />
>>>>>>> 22729ff27e709bd503b144d9878c537fc132efc2
    </div>

  );
}

export default Settings;
