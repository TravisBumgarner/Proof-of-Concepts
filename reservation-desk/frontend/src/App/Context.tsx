import React from 'react'

type State = {
    user: string
}

const EMPTY_STATE: State = {
    user: ""
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

type Action =
    | UserLoggedInAction


const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'USER_LOGGED_IN': {
            return { ...state, user: action.user }
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