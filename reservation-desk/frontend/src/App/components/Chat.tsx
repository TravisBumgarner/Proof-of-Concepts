import * as React from 'react'
import { w3cwebsocket } from "websocket"

import styled from 'styled-components'

import { Title, Body } from 'sharedComponents'
import { CHAT_MESSAGE_TYPE, Message, ChatMessage } from '../../../../types/websockets'


const ChatInputWrapper = styled.div`
    display: flex;
    min-height: 30px;
`

const ChatInput = styled.input`
    flex-grow: 1;
    flex: 1;
`

const ChatInputSubmit = styled.button``

const ChatMessage = styled.div`
`

const ChatMessagesWrapper = styled.div`
    width: 100%;
    flex-grow: 1;
    background-color: rgba(0,0,0,0.2);
`

type Props = {
    user: String
    client: w3cwebsocket
}

const Chat = ({ user, client }: Props) => {
    const [messages, setMessages] = React.useState<ChatMessage[]>([])
    const [content, setContent] = React.useState('')

    client.onmessage = (message: { data: string }) => {
        console.log(message)
        setMessages([...messages, JSON.parse(message.data)])
    }

    const chatMessages = messages.map(({ content, user }, index) => {
        return <ChatMessage key={index}><strong>{user}</strong>: {content}</ChatMessage>
    })

    const submit = () => {
        const encodedMessage = JSON.stringify({
            content,
            user,
            type: CHAT_MESSAGE_TYPE
        } as ChatMessage)
        client.send(encodedMessage)
        setContent('')
    }

    return (
        <Body>
            <Title>Chat with Other Users</Title>
            <ChatMessagesWrapper>
                {chatMessages}
            </ChatMessagesWrapper>
            <ChatInputWrapper>
                <ChatInput value={content} onChange={(event) => setContent(event.target.value)} />
                <ChatInputSubmit onClick={submit}>Send</ChatInputSubmit>
            </ChatInputWrapper>
        </Body>
    )
}

export default Chat