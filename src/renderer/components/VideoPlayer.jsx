import React, { useContext } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { SocketContext } from '../context/Context';

function VideoPlayer() {
  const { name, callAccepted, myVideo, userVideo, callEnded, call } =
    useContext(SocketContext);
  return (
    <Grid container spacing={3}>
      {/* {
        stream && myVideo && (
          <Grid item xs={12} md={6}>
            <Paper>
              <Typography variant='h5' gutterBottom>{name || 'name'}</Typography>
              <video playsInline muted ref={myVideo} autoPlay />
            </Paper>
          </Grid>
        )
      } */}
      <Grid item xs={12} md={6}>
        <Paper>
          <Typography variant="h5" gutterBottom>
            {name || 'name'}
          </Typography>
          <video
            style={{ width: '100%' }}
            playsInline
            ref={myVideo}
            muted
            autoPlay
          />
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        {callAccepted && !callEnded && (
          <Paper>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                {call.name || 'name'}
              </Typography>
              <video
                style={{ width: '600px' }}
                playsInline
                ref={userVideo}
                autoPlay
              ></video>
            </Grid>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
}

export default VideoPlayer;
