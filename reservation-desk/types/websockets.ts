const CHAT_MESSAGE_TYPE = 'CHAT_MESSAGE'
type ChatMessage = {
    data: {
        id: string
        user: string
        content: string
    }
    type: typeof CHAT_MESSAGE_TYPE
}

const RESERVATION_MESSAGE_TYPE = 'RESERVATION_MESSAGE'
type ReservationMessage = {
    type: typeof RESERVATION_MESSAGE_TYPE
    data: {
        id: string
        user: string
        startTime: number
        endTime: number
    }
}

type Message =
    | ChatMessage
    | ReservationMessage

export {
    Message,
    CHAT_MESSAGE_TYPE,
    RESERVATION_MESSAGE_TYPE,
    ReservationMessage,
    ChatMessage
}
