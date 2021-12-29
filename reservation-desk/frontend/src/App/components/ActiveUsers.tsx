import * as React from 'react'

import { context } from '../Context'
import { Title, Body } from 'sharedComponents'

const ActiveUsers = () => {
    const { state } = React.useContext(context)

    return (
        <Body>
            <Title>Users</Title>
            <ul>
                {state.activeUsers.length === 0
                    ? <li>No Users</li>
                    : state.activeUsers.map(user => <li>{user}</li>)
                }
            </ul>
        </Body>
    )
}

export default ActiveUsers