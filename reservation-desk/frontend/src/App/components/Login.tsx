import React from 'react'
import styled from 'styled-components'
import { w3cwebsocket } from 'websocket'

import { Body } from 'sharedComponents'
import { context, FRONTEND_USER_CONNECTED_ACTION_TYPE, FrontendUserConnectedAction } from '../Context'
import { WEBSOCKETS_USER_CONNECTED_ACTION_TYPE, WebsocketsUserConnectionAction } from '../../../../types/websockets'

type Props = {
    client: w3cwebsocket
}
const Login = ({ client }: Props) => {
    const [user, setUser] = React.useState<string>('bob')
    const [desk, setDesk] = React.useState<string>('deadbeef')
    const { dispatch } = React.useContext(context)

    const handleSubmit = () => {
        const frontendPayload: FrontendUserConnectedAction = {
            type: FRONTEND_USER_CONNECTED_ACTION_TYPE,
            user,
            desk
        }
        dispatch(frontendPayload)

        const websocketsPayload: WebsocketsUserConnectionAction = {
            type: WEBSOCKETS_USER_CONNECTED_ACTION_TYPE,
            user
        }
        client.send(JSON.stringify(websocketsPayload))
    }

    return (
        <Body>
            <label htmlFor="name">Name:</label>
            <input name="name" value={user} onChange={event => setUser(event.target.value)} /><br />
            <label htmlFor="name">Desk:</label>
            <input name="desk" value={desk} onChange={event => setDesk(event.target.value)} /><br />
            <button onClick={handleSubmit}>Reserve Desk</button>
        </Body >
    )
}

export default Login