import React, { useState } from 'react';
import axios from 'axios';
import s from './Chat.module.css'
import { Button, Container, Paper, TextField } from '@material-ui/core';



const JoinBlock = ({ onLogin }) => {
    const [roomId, setRoomId] = useState('')
    const [userName, setUserName] = useState('')
    const [isLoading, setLoading] = useState(false)


    const onEnter = async () => {

        if (!roomId || !userName) { alert('You should not send empty value') }
        const obj = { roomId, userName }

        setLoading(true)
        await axios.post('/rooms', obj)
        onLogin(obj)
    }


    return (
        <Container maxWidth="sm" className={s.chat_container}>
            <Paper elevation={3}>
                <form noValidate autoComplete="off" className={s.chat_join_form}>
                    
                    <div>
                        <TextField onChange={(e) => { setRoomId(e.target.value) }}
                            type='text' value={roomId} id="outlined-basic" label="Select name of chat" variant="outlined" />
                    </div>

                    <div className={s.chat_join_form_name} >
                        <TextField onChange={(e) => { setUserName(e.target.value) }}
                            type='text' value={userName} id="outlined-basic" label="Write your name" variant="outlined"
                        />
                    </div>

                    <div className={s.chat_join_button}>
                        <Button variant="contained" color="primary" onClick={onEnter}>
                            {isLoading ? 'Entering...' : ' Enter in chat'}
                        </Button>
                    </div>

                </form>
            </Paper>
        </Container >
    )
}

export default JoinBlock

