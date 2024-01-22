import React, { useState, useEffect } from 'react';
import SideBarPage from '../components/SideBarPage';
import SettingsForm from '../components/SettingsForm';
import AccountSettingsForm from '../components/AccountSettingsForm';

function Settings() {
  const [selectedElement, setSelectedElement] = useState('Parametre Generals');

  let elems = [
    'Parametre Generals',
    'samia.abbadja@fgei.ummto.dz',
    'lbiochimi45@gmail.com',
    'l2informatique02@yahoo.fr',
  ];


  useEffect(() => {
    setSelectedElement('Parametre Generals');
  }, []);



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
       <SideBarPage elements={elems} path="settings" onElementClick={handleElementClick} />

{selectedElement === 'Parametre Generals' && <SettingsForm />}
{selectedElement !== 'Parametre Generals' && elems.includes(selectedElement) && <AccountSettingsForm email={selectedElement} />}
    </div>
  );
}

export default Settings;

