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

const FRONTEND_WS_CONNECTED_ACTION_TYPE = 'FRONTEND_WS_CONNECTED_ACTION_TYPE'
type FrontendWSConnectedAction = {
    type: typeof FRONTEND_WS_CONNECTED_ACTION_TYPE
}

const FRONTEND_USER_CONNECTED_ACTION_TYPE = 'FRONTEND_USER_CONNECTED_ACTION_TYPE'
type FrontendUserConnectedAction = {
    type: typeof FRONTEND_USER_CONNECTED_ACTION_TYPE
    user: string
    desk: string
}

const FRONTEND_USER_DISCONNECTED_ACTION_TYPE = 'FRONTEND_USER_DISCONNECTED_ACTION_TYPE'
type FrontendUserDisconnectedAction = {
    type: typeof FRONTEND_USER_DISCONNECTED_ACTION_TYPE
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
    | FrontendWSConnectedAction
    | FrontendUserConnectedAction
    | FrontendUserDisconnectedAction

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case FRONTEND_USER_CONNECTED_ACTION_TYPE: {
            return { ...state, isUserConnected: true, user: action.user, desk: action.desk }
        }
        case FRONTEND_USER_DISCONNECTED_ACTION_TYPE: {
            return { ...state, isUserConnected: false, user: '', desk: '' }
        }
        case FRONTEND_WS_CONNECTED_ACTION_TYPE: {
            return { ...state, isWSConnected: true }
        }
        default: {
            console.error("Swallowing action", action)
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
export {
    context,
    Action,
    FrontendUserConnectedAction,
    FrontendUserDisconnectedAction,
    FrontendWSConnectedAction,
    FRONTEND_WS_CONNECTED_ACTION_TYPE,
    FRONTEND_USER_CONNECTED_ACTION_TYPE,
    FRONTEND_USER_DISCONNECTED_ACTION_TYPE
}