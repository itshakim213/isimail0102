import { useEffect, useState } from 'react';
import axios from 'axios';
import SideBarButton from './SideBarButton';
import SearchChat from './SearchChat';
import ContactInv from './ContactInv';
import noConvers from '../assets/noConvers.png';
import '../styles/SideBarContact.css';
import Empty from './Empty';
import { useQuery } from 'react-query'; // useQuery pour le GET, useMutate c pr POST PUT DELETE
import React, { memo } from 'react'; // React.memo sert a ne pas faire de re render bla lma3na ;p

function SideBarContact() {
  const user = JSON.parse(sessionStorage.getItem('user'));

  const { data: usersData } = useQuery('users', async () => {
    const response = await axios.get('http://localhost:4001/api/user/search', {
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  });

  // is loading akked erro nni pr gerer les states n useQuery daya
  const {
    data: convsData,
    isLoading,
    isError,
  } = useQuery('chats', async () => {
    const response = await axios.get('http://localhost:4001/api/chat', {
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  });

  // c deux là pr eviter undefined nni n zmmmmmmer
  // chghel ma yella mazalt vide ad returner [] khir n undefined azeggagh ;-)
  // apres soit ad yawi data nsen negh un vect vide c tt
  // and th vectors aki biensur are managed s useQuery je parle de leur fetch
  const users = usersData || [];
  const convs = convsData || [];
  // console.log(convs);

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (isError) {
    return <div>Erreur lors du chargement des conversation</div>;
  }

  return (
    <div className="side-bar-contact">
      <SearchChat />
      {users.length === 0 ? (
        <Empty
          image={noConvers}
          message="you have no contact"
          width={85}
          height={85}
        />
      ) : (
        <nav className="contact-nav">
          {users.map((user) => (
            <ContactInv
              key={user._id}
              userId={user._id}
              fullname={`${user.firstname} ${user.lastname}`}
              email={`${user.email}`}
            />
          ))}
        </nav>
      )}
      <SideBarButton text="Ajouter Conversation" />
    </div>
  );
}
export default SideBarContact;
