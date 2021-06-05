import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@material-ui/core';
import socket from './../3-dal-chat/socket';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import s from './Chat.module.css'

const useStyles = makeStyles((theme) =>
    createStyles({
        root_message: {
            width: '100%',
            backgroundColor: 'rgba(180, 180, 180, 0.26)',
        },
        avatar: {
            backgroundColor: 'rgba(34, 32, 138, 0.5)',
        }
    }),
);


const ChatMessage = ({ messages, userName, roomId }) => {
    const classes = useStyles();

    const messageRef = useRef(null)
    const [message, setMessage] = useState('')
    const [isAutoScroll, setAutoScroll] = useState(true)

    const onSendMessage = () => {
        socket.emit('ROOM:NEW_MESSAGE', {
            roomId,
            userName,
            text: message
        })
        setMessage('')
    }

    const scrollHandler = (e) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setAutoScroll(true)
        } else {
            isAutoScroll && setAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messageRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])


    return (
        <React.Fragment>
            <List className={classes.root_message} style={{ height: '400px', overflowY: 'auto' }} onScroll={scrollHandler}>
                {messages.map((m, index) =>
                    <React.Fragment>
                        <ListItem key={index} alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    {m.userName.charAt(0).toUpperCase()}
                                </Avatar>
                            </ListItemAvatar>

                            <ListItemText
                                primary={m.text}
                                secondary={`${m.userName} - ${new Date().toLocaleDateString()}`} />
                            <Divider variant="inset" component="li" />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <div ref={messageRef}></div>
                    </React.Fragment>
                )}
            </List>

            <form noValidate autoComplete="off" className={s.chat_message_form}>

                <TextField value={message}
                    onChange={(e) => { setMessage(e.target.value) }} id="outlined-textarea" label="Write here..."
                    placeholder="Your message..." multiline variant="outlined" className={s.chat_message_field} />

                <div className={s.chat_join_button}>

                    <Button onClick={onSendMessage} variant="contained" color="primary">
                        Send message </Button>
                        
                </div>
            </form>
        </React.Fragment>
    )
}

export default ChatMessage