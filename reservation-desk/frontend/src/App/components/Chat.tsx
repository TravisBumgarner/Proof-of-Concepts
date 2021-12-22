import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { w3cwebsocket as W3CWebSocket } from "websocket"
import styled from 'styled-components'

const client = new W3CWebSocket('ws://127.0.0.1:5000')

const AppWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
`

const ChatClientWrapper = styled.div`
    width: 70vw;
    height: 70vh;
    border: 2px solid black;
    padding 10px;
    display: flex;
    flex-direction: column;
`

const ChatInputWrapper = styled.div`
    display: flex;
    min-height: 30px;
`

const ChatInput = styled.input`
    // box-sizing: border-box;
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


const makeFakeUser = () => 'User' + (Math.random() * 1000000 + '').split('.')[0]
const user = makeFakeUser()

type Message = {
    content: string,
    sender: string
}

const Chat = () => {
    const [hasConnected, setHasConnected] = React.useState<boolean>(false)
    const [messages, setMessages] = React.useState<Message[]>([])
    const [content, setContent] = React.useState('')

    client.onmessage = (message: { data: string }) => {
        console.log(JSON.parse(message.data))
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
        <AppWrapper>
            <ChatClientWrapper>
                <h1>Hello {user}</h1>
                <ChatMessagesWrapper>
                    {chatMessages}
                </ChatMessagesWrapper>
                <ChatInputWrapper>
                    <ChatInput value={content} onChange={(event) => setContent(event.target.value)} />
                    <ChatInputSubmit onClick={submit}>Send</ChatInputSubmit>
                </ChatInputWrapper>
            </ChatClientWrapper>
            )
        </AppWrapper>
    )
}

export default Chat