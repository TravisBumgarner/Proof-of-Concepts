const WEBSOCKETS_USER_CONNECTED_ACTION_TYPE = "WEBSOCKETS_USER_CONNECTED_ACTION_TYPE"
type WebsocketsUserConnectionAction = {
    user: string
    type: typeof WEBSOCKETS_USER_CONNECTED_ACTION_TYPE
}

type WebsocketsAction = WebsocketsUserConnectionAction

const WEBSOCKET_ACTIONS = WEBSOCKETS_USER_CONNECTED_ACTION_TYPE

export {
    WEBSOCKETS_USER_CONNECTED_ACTION_TYPE,
    WebsocketsUserConnectionAction,
    WebsocketsAction,
    WEBSOCKET_ACTIONS
}