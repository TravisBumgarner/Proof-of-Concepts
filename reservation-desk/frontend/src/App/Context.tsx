import React from 'react'

type State = {
    isWSConnected: boolean
    isUserConnected: boolean
    user: string,
    desk: string
}

const EMPTY_STATE: State = {
    isWSConnected: false,
    isUserConnected: false,
    user: '',
    desk: ''
}

const WS_CONNECTED_ACTION_TYPE = 'WS_CONNECTED_ACTION_TYPE'
type WS_CONNECTED_ACTION = {
    type: typeof WS_CONNECTED_ACTION_TYPE
}

const USER_CONNECTED_ACTION_TYPE = 'USER_CONNECTED_ACTION_TYPE'
type USER_CONNECTED_ACTION = {
    type: typeof USER_CONNECTED_ACTION_TYPE
    user: string
    desk: string
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
    | WS_CONNECTED_ACTION
    | USER_CONNECTED_ACTION

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case USER_CONNECTED_ACTION_TYPE: {
            return { ...state, isUserConnected: true, user: action.user, desk: action.desk }
        }
        case WS_CONNECTED_ACTION_TYPE: {
            return { ...state, isWSConnected: true }
        }
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
export { context, Action, WS_CONNECTED_ACTION_TYPE, USER_CONNECTED_ACTION_TYPE }