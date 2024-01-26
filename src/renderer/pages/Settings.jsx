import React, { useState } from 'react';
import SideBarPage from '../components/SideBarPage';
 //import SettingsForm from '../components/SettingsForm';
import AccountSettingsForm from '../components/AccountSettingsForm';
import PageList from '../components/PageList';

function Settings() {
  const [currentSettings, setCurrentSettings] = useState('Parametre de compte');

  const user = JSON.parse(sessionStorage.getItem('user'));
  console.log(user);

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
        elements={['Parametre de compte', 'Parametre general']}
        path="settings"
        setCurrentSettings={setCurrentSettings}
      />

      <AccountSettingsForm currentSettings={currentSettings} />
      {/* <SettingsForm currentSettings={currentSettings} /> */}
    </div>
  );
}

export default Settings;
