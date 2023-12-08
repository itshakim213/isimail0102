import React from 'react';
import SideBarPage from '../components/SideBarPage';
import SettingsForm from '../components/SettingsForm';

function Settings() {
  let elems = [
    'Parametre Generals',
    'mohanddjouadi@gmail.com',
    'mohanddjouadi.@fgei.ummto.dz',
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
      <SideBarPage elements={elems} path="settings" />
      <SettingsForm />
    </div>
  );
}

export default Settings;
