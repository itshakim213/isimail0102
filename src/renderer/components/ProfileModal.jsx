import { Image } from '@mui/icons-material';
import { Avatar, Typography } from '@mui/material';
import React from 'react';

function ProfileModal ({user}) {
  return (
    <div style={{display:'flex', justifyContent:'space-around', alignItems:'center', flexDirection:'column'}}>
      <h1>
        {user.firstname} {user.lastname}
      </h1>
      <Avatar
        mr={5}
        size="md"
        cursor="pointer"
        name={user.firstname}
        src={user.pic}
      />
      <Typography
        
        fontFamily="Work sans"
      >
        Email : {user.email}
      </Typography>
    </div>
  );
};

export default ProfileModal;