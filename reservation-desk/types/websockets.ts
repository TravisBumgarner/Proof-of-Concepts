const CHAT_MESSAGE_TYPE = 'chat_message'
type ChatMessage = {
    user: string
    content: string
    type: typeof CHAT_MESSAGE_TYPE
}

const RESERVATION_MESSAGE_TYPE = 'reservation_message'
type ReservationMessage = {
    user: string
    startTime: number
    endTime: number
    type: typeof RESERVATION_MESSAGE_TYPE
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
