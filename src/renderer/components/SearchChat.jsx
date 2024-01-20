import { useState } from 'react';
import search from '../assets/search.png';
import '../styles/SearchChat.css';
import axios from 'axios';

function SearchChat() {
  // const [search, setSearch] = useState();
  // const loadUsers = async (users) => {
  //   try {
  //     const response = await axios.get('http://localhost:4001/api/user/search');
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // function searchUser(sear) {
  //   const usersPromise = loadUsers();
  //   usersPromise.then((usersData) => {
  //     const users = [...usersData];
  //     const filtredUsers = users.filter((user) => {
  //       return (
  //         user.firstname.includes(sear) ||
  //         user.lastname.includes(sear) ||
  //         user.email.includes(sear)
  //       );
  //     });
  //   });
  //   return filtredUsers;
  // }

  return (
    <input
      className="search-cht"
      type="text"
      placeholder="Search"
      name="search-chat"
    />
  );
}
export default SearchChat;
