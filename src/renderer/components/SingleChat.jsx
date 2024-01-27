import { Box, Button, FormControl, IconButton, Input, Paper, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { ChatState } from '../context/ChatContext';
import axios from 'axios';
import { io } from 'socket.io-client';
import ScrollableChat from './ScrollableChat';
import '../styles/mailist.css';

const ENDPOINT = 'http://localhost:4001';
var socket, selectedChatCompare;

function SingleChat({ fetchAgain, setFetchAgain }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const { user, selectedChat, setSelectedChat } = useContext(ChatState);

  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(`http://localhost:4001/api/message/${selectedChat._id}`, config);

      setMessages(data);
      setLoading(false);

      socket.emit('join chat', selectedChat._id)
    } catch (error) {
       console.log(error);
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', user);
    socket.on('connected', () => setSocketConnected(true));
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));
  });

  const sendMessage = async (event) => {
    if (event.key === 'Enter' && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.post('http://localhost:4001/api/message', {
          content: newMessage,
          chatId: selectedChat._id,
        } , config);

        socket.emit('new message', data)
        setNewMessage('');
        setMessages([...messages, data])

      } catch (error) {
        console.log(error);
      }
  }}

 const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) {
      return
    }

    if (!typing) {
      setTyping(true)
      socket.emit('typing', selectedChat._id)
    }

    let lastTypingTime = new Date().getTime()
    var timerLength = 3000
    setTimeout(() => {
      var timeNow = new Date().getTime()
      var timeDiff = timeNow - lastTypingTime
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
};

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on('message recieved', (newMessageRecieved) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
        // notiff
      } else {
        setMessages([...messages, newMessageRecieved])
      }
    });
  });

  return (
    <div className="mail-item" style={{ overflowY: 'auto', height: '100%' }}>
      <Typography
        fontSize={{ base: '28px', md: '30px' }}
        pb={3}
        px={2}
        w="100%"
        fontFamily="Work sans"
        display="flex"
        justifyContent={{ base: 'space-between' }}
        alignItems="center"
      >
        <Button
          display={{ base: 'flex', md: 'none' }}
          onClick={() => setSelectedChat('')}
        >
          <CloseIcon cursor="pointer"></CloseIcon>
        </Button>
        <h5>{selectedChat.chatName.toUpperCase()}</h5>
      </Typography>
      <Box
        display="flex"
        flexDir="column"
        justifyContent="flex-end"
        p={3}
        bg="#E8E8E8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
        style={{ flex: 1 }}
      >
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {loading ? (
            <div>loading</div>
          ) : (
            <div display="flex">
              <ScrollableChat messages={messages} />
            </div>
          )}
        </div>
      </Box>
      <FormControl
        onKeyDown={sendMessage}
        style={{ width: '100%', height: '50px', alignSelf: 'flex-end' }}
      >
        <TextField
          fullWidth
          size="md"
          variant="outlined"
          background="#FFF"
          placeholder="Enter a message... "
          onChange={typingHandler}
          value={newMessage}
        />
      </FormControl>
    </div>
  );
}
export default SingleChat;
