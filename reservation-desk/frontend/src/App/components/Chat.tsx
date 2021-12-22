import * as React from 'react'
import { w3cwebsocket } from "websocket"

import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'


import { Title, Body } from 'sharedComponents'
import { CHAT_MESSAGE_TYPE, Message, ChatMessage } from '../../../../types/websockets'
import { context } from '../Context'

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

const Chat = () => {
    const [content, setContent] = React.useState('')
    const { state, dispatch } = React.useContext(context)

    const chatMessages = state.messages.map(({ content, user, id }) => {
        return <ChatMessage key={id}><strong>{user}</strong>: {content}</ChatMessage>
    })

    const submit = () => {
        const message = {
            data: {
                content,
                user: state.user,
                id: uuidv4()
            },
            type: CHAT_MESSAGE_TYPE
        } as ChatMessage
        dispatch(message)
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