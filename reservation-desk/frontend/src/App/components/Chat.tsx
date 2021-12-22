import * as React from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket"
import styled from 'styled-components'

import { Title, Body } from 'sharedComponents'

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


type Message = {
    content: string,
    sender: string
}

type Props = {
    user: String
}

const Chat = ({ user }: Props) => {

    const [hasConnected, setHasConnected] = React.useState<boolean>(false)
    const [messages, setMessages] = React.useState<Message[]>([])
    const [content, setContent] = React.useState('')

    const client = new W3CWebSocket('ws://127.0.0.1:5000')


    client.onmessage = (message: { data: string }) => {
        setMessages([...messages, JSON.parse(message.data)])
    }
    if (!hasConnected) {
        client.onopen = () => {
            setHasConnected(true)
        }
        return <p>Loading</p>
    }


    const chatMessages = messages.map(({ content, sender }, index) => {
        return <ChatMessage key={index}><strong>{sender}</strong>: {content}</ChatMessage>
    })

    const submit = () => {
        const encodedMessage = JSON.stringify({
            content,
            sender: user,
        })
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