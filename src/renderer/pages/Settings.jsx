<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React from 'react';
>>>>>>> f0041a8df519c5c28d52007d686264332981636c
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
<<<<<<< HEAD


  useEffect(() => {
    setSelectedElement('Parametre Generals');
  }, []);



  const handleElementClick = (element) => {
    setSelectedElement(element);
  };

=======
>>>>>>> f0041a8df519c5c28d52007d686264332981636c
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
       <SideBarPage elements={elems} path="settings" onElementClick={handleElementClick} />

{selectedElement === 'Parametre Generals' && <SettingsForm />}
{selectedElement !== 'Parametre Generals' && elems.includes(selectedElement) && <AccountSettingsForm email={selectedElement} />}
=======
      <SideBarPage elements={elems} path="settings" />
      <SettingsForm />
>>>>>>> f0041a8df519c5c28d52007d686264332981636c
    </div>
  );
}

export default Settings;

