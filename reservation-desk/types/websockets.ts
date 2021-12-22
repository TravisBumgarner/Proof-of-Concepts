const CHAT_MESSAGE_TYPE = 'chat_message'
type ChatMessage = {
    user: string
    content: string
    type: typeof CHAT_MESSAGE_TYPE
}

const SQS_MESSAGE_TYPE = 'chat_message'
type SQSMessage = {
    user: string
    content: string
    type: typeof SQS_MESSAGE_TYPE
}

type Message =
    | ChatMessage
    | SQSMessage

export {
    Message,
    CHAT_MESSAGE_TYPE,
    SQS_MESSAGE_TYPE,
    SQSMessage,
    ChatMessage
}
