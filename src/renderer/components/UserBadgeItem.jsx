import { Box } from '@mui/material';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

function UserBadgeItem ({user, handleFunction, admin}) {
  return (
    <Box
      px={2}
      py={1}
      borderRadius="10%"
      m={1}
      mb={2}
      fontSize={15}
      backgroundColor="purple"
      color="white"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.firstname} {user.lastname}
      {admin === user._id && <span>(Admin)</span>}{' '}
      <CloseIcon fontSize='15px' cursor="pointer"></CloseIcon>
    </Box>
  );
};

export default UserBadgeItem;