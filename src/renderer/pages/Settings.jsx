import React, { useState } from 'react';
import SideBarPage from '../components/SideBarPage';
import SettingsForm from '../components/SettingsForm';

function Settings() {
  const [selectedElement, setSelectedElement] = useState('');

  let elems = [
    'Parametre Generals',
    'samia.abbadja@fgei.ummto.dz',
    'lbiochimi45@gmail.com',
    'l2informatique02@yahoo.fr',
  ];

  const handleElementClick = (element) => {
    setSelectedElement(element);
  };

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
      <SideBarPage
       elements={elems} path="settings" onElementClick={handleElementClick} />
      {selectedElement === 'Parametre Generals' && <SettingsForm />}
    </div>
  );
}

export default Settings;
