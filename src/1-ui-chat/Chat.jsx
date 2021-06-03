import React, { useEffect, useRef, useState } from 'react';
import socket from './../3-dal-chat/socket';




 const Chat = ({ users, messages, userName, roomId, onAddMessage }) => {
    const [message, setMessage] = useState('')
    const messageRef=useRef(null)

    const [isAutoScroll, setAutoScroll] = useState(true)

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

    const onSendMessage=()=>{
        socket.emit('ROOM:NEW_MESSAGE', {
            roomId,
            userName,
            text: message
        })

        setMessage('')

    }

    return (
        <div>
            <div>Room - {roomId}</div>
            <div>Now onlain:
                <b>{users.length}</b>
                <ul>
                    {users.map((name, index) => <li key={index}>{name}</li>)}
                </ul>
            </div>
            <div style={{ height: '200px', overflowY: 'auto' }} onScroll={scrollHandler}>
                {messages.map((m, index) =><div key={index}>
                    <p>{m.text}</p>
                    <div>{m.userName}</div>
                    <div ref={messageRef}></div>
                </div>)}
            </div>

            <textarea value={message} rows={3}
                onChange={(e) => { setMessage(e.target.value) }} />
            <button onClick={onSendMessage}>Send</button>
        </div>
    )
}

export default Chat