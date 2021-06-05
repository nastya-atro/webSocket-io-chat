import React, { useEffect, useReducer } from 'react';
import reducer from '../2-bll-chat/chatReducer';
import axios from 'axios';
import Chat from './Chat';
import JoinBlock from './JoinBlock';
import socket from '../3-dal-chat/socket';


const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    isJoin: false,
    roomId: null,
    userName: null,
    users: [],
    messages: []
  })

  const onLogin = async (obj) => {
    dispatch({
      type: 'chat/JOINED',
      payload: obj,
    })
    socket.emit('ROOM:JOIN', obj);
    const { data } = await axios.get(`/rooms/${obj.roomId}`)
    dispatch({
      type: 'chat/SET_DATA',
      payload: data
    })
  }

  const setUsers = (users) => {
    dispatch({
      type: 'chat/SET_USERS',
      payload: users
    })
  }

  useEffect(() => {
    socket.on('ROOM:JOINED', setUsers)
    socket.on('ROOM:SET_USERS', setUsers)
    socket.on('ROOM:NEW_MESSAGE', (message) => {
      dispatch({
        type: 'chat/NEW_MESSAGES',
        payload: message

      })
    })
  }, [])

  window.socket = socket;


  return (
    <div>
      {!state.isJoin ? <JoinBlock onLogin={onLogin} /> :
        <Chat {...state} />}
    </div>


  );
}

export default App;
