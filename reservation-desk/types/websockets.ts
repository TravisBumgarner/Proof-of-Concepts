// const CHAT_MESSAGE = 'CHAT_MESSAGE'
// type ChatMessage = {
//     data: {
//         id: string
//         user: string
//         content: string
//     }
//     type: typeof CHAT_MESSAGE
// }

// const RESERVATION_MESSAGE = 'RESERVATION_MESSAGE'
// type ReservationMessage = {
//     type: typeof RESERVATION_MESSAGE
//     data: {
//         id: string
//         user: string
//         desk: string
//         startTime: number
//         endTime: number
//     }
// }

// type Message =
//     | ChatMessage
//     | ReservationMessage

const ACTIONS = {
    LOGIN: "LOGIN_ACTION",
    LOGOUT: "LOGOUT_ACTION"
} as const

type LoginAction = {
    user: string,
    desk: string
    type: typeof ACTIONS.LOGIN
}

type LogoutAction = {
    user: string,
    desk: string
    type: typeof ACTIONS.LOGOUT
}

type Action = LoginAction | LogoutAction

export {
    // Message,
    // CHAT_MESSAGE,
    // RESERVATION_MESSAGE,
    // ReservationMessage,
    // ChatMessage
    LoginAction,
    LogoutAction,
    Action,
    ACTIONS
}
