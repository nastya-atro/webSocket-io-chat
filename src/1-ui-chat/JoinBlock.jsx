import React, { useState } from 'react';
import axios from 'axios';



const JoinBlock = ({onLogin}) => {
    const [roomId, setRoomId] = useState('')
    const [userName, setUserName] = useState('')
    const [isLoading, setLoading] = useState(false)
    

    const onEnter = async() => {
        
        if (!roomId || !userName) { alert('You should not send empty value') }
        const obj={ roomId, userName }
      
        setLoading(true)
        await axios.post('/rooms', obj)
        onLogin(obj)
    }


    return (
        <div >
            <input onChange={(e) => { setRoomId(e.target.value) }}
                type='text' placeholder='Room Id' value={roomId} />
            <input onChange={(e) => { setUserName(e.target.value) }}
                type='text' placeholder='Write your name' value={userName} />
            <div><button onClick={onEnter}>
                {isLoading? 'Entering...' :' Enter in room'} 
               </button></div>
        </div>
    )
}

export default JoinBlock

