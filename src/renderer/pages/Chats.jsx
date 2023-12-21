import React from 'react';
import SideBarPage from '../components/SideBarPage';
import PageList from '../components/PageList';
import PageSelectCont from '../components/PageSelectCont';

function Chats() {
  let elems = [];
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
      <SideBarPage elements={elems} path="chats" />
      <PageList />
      <PageSelectCont message="select contact" />
    </div>
  );
}

export default Chats;
