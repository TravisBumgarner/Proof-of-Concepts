import React from 'react'
import { LoginAction, ACTIONS } from '../../../types/websockets'

type State = {
    user: string,
    desk: string,
    messages: any // ChatMessage['data'][],
    reservations: any //ReservationMessage['data'][]
}

const EMPTY_STATE: State = {
    user: "",
    desk: "",
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

type Action =
    LoginAction
// | UserLoggedIn
// | Message
// | Reservation

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ACTIONS.LOGIN: {
            return { ...state, user: action.user, desk: action.desk }
            break
        }
        // case CHAT_MESSAGE: {
        //     return { ...state, messages: [...state.messages, action.data] }
        //     break
        // }
        // case RESERVATION_MESSAGE: {
        //     return { ...state, reservations: [...state.reservations, action.data] }
        //     break
        // }
        default: {
            console.error("Swalling action", action)
            return state
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