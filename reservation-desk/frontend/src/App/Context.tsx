import React from 'react'
import { ChatMessage, ReservationMessage, CHAT_MESSAGE_TYPE, RESERVATION_MESSAGE_TYPE } from '../../../types/websockets'

type State = {
    user: string,
    messages: ChatMessage['data'][],
    reservations: ReservationMessage['data'][]
}

const EMPTY_STATE: State = {
    user: "",
    messages: [],
    reservations: [],
}

const context = React.createContext(
    {
        state: EMPTY_STATE,
        dispatch: () => { }
    } as {
        state: State,
        dispatch: React.Dispatch<Action>
    })


type UserLoggedInAction = { type: 'USER_LOGGED_IN', user: string }
type MessageReceivedInAction = { type: typeof CHAT_MESSAGE_TYPE } & ChatMessage
type ReservationReceivedInAction = { type: typeof RESERVATION_MESSAGE_TYPE } & ReservationMessage

type Action =
    | UserLoggedInAction
    | MessageReceivedInAction
    | ReservationReceivedInAction

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'USER_LOGGED_IN': {
            return { ...state, user: action.user }
            break
        }
        case CHAT_MESSAGE_TYPE: {
            return { ...state, messages: [...state.messages, action.data] }
            break
    }
        case RESERVATION_MESSAGE_TYPE: {
            return { ...state, reservations: [...state.reservations, action.data] }
            break
        }
    }
}

const ResultsContext = ({ children }: { children: React.ReactChild }) => {
    const [state, dispatch] = React.useReducer(reducer, EMPTY_STATE)

    const Provider = context.Provider

    return (
        <Provider value={{ state, dispatch }}>
            {children}
        </Provider>
    )
}

export default ResultsContext
export { context, Action }