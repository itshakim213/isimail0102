import React, { useState, useEffect } from 'react';
import SideBarPage from '../components/SideBarPage';
// import SettingsForm from '../components/SettingsForm';
import AccountSettingsForm from '../components/AccountSettingsForm';

function Settings() {
  // const [currentSettings, setCurrentSettings] = useState('Parametre de compte');
    const [selectedElement, setSelectedElement] =
      useState('Parametre Generals');

  // const user = JSON.parse(sessionStorage.getItem('user'));
  // console.log(user);
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
=======
      <SideBarPage elements={elems} path="settings" />
      <SettingsForm />
      {/* <SideBarPage
        elements={['Parametre de compte', 'Parametre general']}
        path="settings"
        setCurrentSettings={setCurrentSettings}
      /> */}
      {/* <AccountSettingsForm 
      // currentSettings={currentSettings} 
      /> */}
      {/* <SettingsForm currentSettings={currentSettings} /> */}
    </div>
  );
}

export default Settings;
