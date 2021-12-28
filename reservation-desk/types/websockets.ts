const WEBSOCKETS_USER_CONNECTED_ACTION_TYPE = "WEBSOCKETS_USER_CONNECTED_ACTION_TYPE"
type WebsocketsUserConnectedAction = {
    user: string
    type: typeof WEBSOCKETS_USER_CONNECTED_ACTION_TYPE
}

const WEBSOCKETS_USER_DISCONNECTED_ACTION_TYPE = "WEBSOCKETS_USER_DISCONNECTED_ACTION_TYPE"
type WebsocketsUserDisconnectedAction = {
    user: string
    type: typeof WEBSOCKETS_USER_DISCONNECTED_ACTION_TYPE
}

type WebsocketsAction =
    | WebsocketsUserConnectedAction
    | WebsocketsUserDisconnectedAction

const WEBSOCKET_ACTIONS = WEBSOCKETS_USER_CONNECTED_ACTION_TYPE

export {
    WEBSOCKETS_USER_CONNECTED_ACTION_TYPE,
    WEBSOCKETS_USER_DISCONNECTED_ACTION_TYPE,
    WebsocketsUserConnectedAction,
    WebsocketsUserDisconnectedAction,
    WebsocketsAction,
    WEBSOCKET_ACTIONS
}