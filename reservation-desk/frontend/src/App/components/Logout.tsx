import React from 'react'
import styled from 'styled-components'
import { w3cwebsocket } from 'websocket'

import { Body } from 'sharedComponents'
import { context, FRONTEND_USER_DISCONNECTED_ACTION_TYPE, FrontendUserDisconnectedAction } from '../Context'
import {
    WEBSOCKETS_USER_DISCONNECTED_ACTION_TYPE,
    WebsocketsUserDisconnectedAction
} from '../../../../types/websockets'

type Props = {
    client: w3cwebsocket
}
const Logout = ({ client }: Props) => {
    const { dispatch, state } = React.useContext(context)

    const handleSubmit = () => {
        const frontendPayload: FrontendUserDisconnectedAction = {
            type: FRONTEND_USER_DISCONNECTED_ACTION_TYPE,
        }
        dispatch(frontendPayload)

        const websocketsPayload: WebsocketsUserDisconnectedAction = {
            type: WEBSOCKETS_USER_DISCONNECTED_ACTION_TYPE,
            user: state.user
        }
        client.send(JSON.stringify(websocketsPayload))
    }

    return (
        <Body>

            <button onClick={handleSubmit}>Logout</button>
        </Body >
    )
}

export default Logout