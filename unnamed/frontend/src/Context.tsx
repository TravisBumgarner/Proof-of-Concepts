import React from 'react'

import { } from 'sharedTypes'
import { getLocalStorage, setLocalStorage } from 'utilities'

const HAS_DONE_WARM_START = 'HAS_DONE_WARM_START'
const TRUE = 'TRUE'

type TState = {
    accounts: string[]
}

const EMPTY_STATE: TState = {
    accounts: []
}

const initialSetup = () => {
    Object
        .keys(EMPTY_STATE)
        .forEach((key: keyof TState) => setLocalStorage(key, EMPTY_STATE[key]))

    setLocalStorage(HAS_DONE_WARM_START, TRUE)
}

const getKeysFromStorage = () => {
    // This function is bad. :shrug:
    const output: Record<string, string> = {}

    Object
        .keys(EMPTY_STATE)
        .forEach((key: string) => {
            output[key] = getLocalStorage(key) as string
        })
    return output as unknown as TState
}

type HydrateUserSettings = {
    type: 'HYDRATE_USER_SETTINGS',
    payload: TState
}

type UpdateAccounts = {
    type: 'UPDATE_ACCOUNTS',
    payload: {
        accounts: string[]
    }
}


type Action =
    | HydrateUserSettings
    | UpdateAccounts

const reducer = (state: TState, action: Action): TState => {
    console.log('new reducer action')
    switch (action.type) {
        case 'HYDRATE_USER_SETTINGS': {
            return { ...state, ...action.payload }
        }
        case 'UPDATE_ACCOUNTS': {
            setLocalStorage('accounts', action.payload.accounts)
            return { ...state, accounts: action.payload.accounts }
        }
        default:
            throw new Error('Unexpected action')
    }
}

const context = React.createContext(
    {
        state: EMPTY_STATE,
        dispatch: () => { },
    } as {
        state: TState,
        dispatch: React.Dispatch<Action>
    },
)

const ResultsContext = ({ children }: { children: React.ReactChild }) => {
    const [state, dispatch] = React.useReducer(reducer, EMPTY_STATE)
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    React.useEffect(() => {
        const fetchData = async () => {
            if (getLocalStorage(HAS_DONE_WARM_START) !== TRUE) {
                initialSetup()
            } else {
                const payload = await getKeysFromStorage()
                dispatch({ type: 'HYDRATE_USER_SETTINGS', payload })
            }
        }

        setIsLoading(true)
        fetchData()
        setIsLoading(false)
    }, [])

    if (isLoading) {
        return <p>Loading...</p>
    }

    const { Provider } = context

    return (
        <Provider value={{ state, dispatch }}>
            {children}
        </Provider>
    )
}

export default ResultsContext
export {
    context
}