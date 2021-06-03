export default (state, action) => {
    switch (action.type) {
        case 'chat/JOINED':
            return {
                ...state,
                isJoin: true,
                userName: action.payload.userName,
                roomId: action.payload.roomId,

            }
        case 'chat/SET_USERS':
            return {
                ...state,
                users: action.payload


            }
        case 'chat/NEW_MESSAGES':
            return {
                ...state,
                messages: [...state.messages, action.payload]


            }

        case 'chat/SET_DATA':
            return {
                ...state,
                users: action.payload.users,
                messages: action.payload.messages


            }
        default: return state
    }
}