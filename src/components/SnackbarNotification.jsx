import { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';

import { Client } from "@stomp/stompjs";

import { Alert, AlertTitle, Snackbar } from '@mui/material';

import { addMessage, clearMessages, popMessage } from "../snackbarMessagesSlice";
import { useCurrentUser } from "../hooks/useCurrentUser";

const SnackbarNotification = props => {

  const [open, setOpen] = useState(false);
  const snackbarMessages = useSelector(state => state.snackbarMessages);
  const user = useCurrentUser();

  const [loginTopic, setLoginTopic] = useState();
  const [newCarTopic, setNewCarTopic] = useState();

  const [client, setClient] = useState(
    new Client({
      brokerURL: 'ws://localhost:10000/ws',
      reconnectDelay: 0,
    })
  )

  client.onConnect = (e) => {
    console.log('Connected');
    setLoginTopic(
      client.subscribe('/topic/login', msg => {
        const message = JSON.parse(msg.body);
        dispatch(
          addMessage({
            message: `${message.usernameOrEmail} has just logged in`,
            title: 'Login',
            severity: 'info'
          })
        );
      })
    );
    setNewCarTopic(
      client.subscribe('/topic/new_car', msg => {
        const message = JSON.parse(msg.body);
        dispatch(addMessage({
          message: `${message.user + ' has just added the car '}${message.car}`,
          title: 'New car',
          severity: 'info'
        }));
      })
    );
  };
  client.onDisconnect = (e) => {
    console.log('Disconnected');
  }
  client.onStompError = (e) => {
    console.log(e);
  }

  useEffect(() => {
    if (user) {
      client.activate();
    } else {
      dispatch(clearMessages());
      client.deactivate();
    }
  }, [user]);

  useEffect(() => {
    if (snackbarMessages.length > 0) setOpen(true);
  }, [snackbarMessages]);

  // functions
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  }
  const handleExited = () => {
    dispatch(popMessage());
  }

  return (<>
    {snackbarMessages.length > 0 &&
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        transitionDuration={200}
        TransitionProps={{
          onExited: handleExited
        }}
      >
        <Alert onClose={handleClose} severity={snackbarMessages[0].severity} sx={{ width: '400px' }} >
          <AlertTitle>{snackbarMessages[0].title}</AlertTitle>
          <span>
            {snackbarMessages[0].message}
          </span>
        </Alert>
      </Snackbar>
    }
  </>
  );
}

export default SnackbarNotification;
