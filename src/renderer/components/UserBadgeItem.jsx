import { Box } from '@mui/material';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

function UserBadgeItem ({user, handleFunction, admin}) {
  return (
    <Box
      px={2}
      py={1}
      borderRadius="8%"
      m={1}
      mb={2}
      fontSize={15}
      backgroundColor="rgb(85, 124, 200)"
      color="white"
      cursor="pointer"
      onClick={handleFunction}
    >
      <p style={{display: 'inline-block', fontSize: 22 }}>{user.firstname} {user.lastname}
      {admin === user._id && <span>(Admin)</span>}{' '}</p>
      <CloseIcon style={{ fontSize: 18, margin: '.6rem 0 0 .5rem' }} cursor="pointer"></CloseIcon>
    </Box>
  );
};

export default UserBadgeItem;