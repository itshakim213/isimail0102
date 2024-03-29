import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';

function UserListItem({ user, handleFunction }) {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: '#38B2AC',
        color: 'white',
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.firstname}
        src={user.pic}
      />
      <Box>
        <Typography>
          {user.firstname} {user.lastname}
        </Typography>
        <p>Email : {user.email}</p>
      </Box>
    </Box>
  );
}

export default UserListItem;
