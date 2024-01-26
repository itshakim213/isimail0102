import React, { useContext, useEffect, useState } from 'react';
import { ChatState } from '../context/ChatContext';
import axios from 'axios';
import { Box, Button, Dialog, DialogActions, DialogContentText, Input, Modal, TextField, Typography } from '@mui/material';
import { DialogContent, DialogTitle, FormControl, FormLabel, ModalClose, ModalDialog, Stack } from '@mui/joy';
import { Add } from '@mui/icons-material';
import UserListItem from './UserListItem';
import GroupChatModal from './GroupChatModal';

function ChatBox({ fetchAgain }) {
  const [loggedUser, setLoggedUser] = useState();
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user, setSelectedChat, chats, setChats, selectedChat } =
    useContext(ChatState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchChats = async () => {
    const userToken = JSON.parse(sessionStorage.getItem('user')).token;
    console.log(userToken);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      console.log(user.token);
      const { data } = await axios.get(
        'http://localhost:4001/api/chat',
        config,
      );
      setChats(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:4001/api/user/search?search=${search}`,
        config,
      );
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        'http://localhost:4001/api/chat',
        { userId },
        config,
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    fetchChats();
  }, [fetchAgain]);
  return (
    <div className="contact-nav">
      <Box
        pb={3}
        px={3}
        fontSize={{ base: '28px', md: '30px' }}
        fontFamily="Work sans"
        display="flex"
        w="70%"
        textAlign="center"
      >
        Discussions
      </Box>
      <GroupChatModal>
        <Button variant="filled" onClick={handleClickOpen}>
          New Group Chat
        </Button>
      </GroupChatModal>
      <Input
        placeholder="Search users to chat"
        color="primary"
        size="lg"
        variant="outlined"
        onChange={(e) => handleSearch(e.target.value)}
      />
      {loading ? (
        <div>loadin</div>
      ) : (
        searchResult?.slice(0, 4).map((userr) => (
          <UserListItem
            key={userr._id}
            user={userr}
            handleFunction={() => accessChat(userr)}
            color="white"
          >
            {userr.lastname}
          </UserListItem>
        ))
      )}
      {chats.map((chat) => (
        <Box
          onClick={() => setSelectedChat(chat)}
          cursor="pointer"
          backgroundColor={selectedChat === chat ? '#1a2e62' : '#fff'}
          color={selectedChat === chat ? 'white' : 'black'}
          px={3}
          py={2}
          borderRadius="lg"
          key={chat._id}
        >
          <Typography> {chat.chatName} </Typography>
          {chat.latestMessage && (
            <p fontSize="xs">
              <b>{chat.latestMessage.sender.firstname} : </b>
              {chat.latestMessage.content.length > 50
                ? chat.latestMessage.content.substring(0, 51) + '...'
                : chat.latestMessage.content}
            </p>
          )}
        </Box>
      ))}
    </div>
  );
}

export default ChatBox;
