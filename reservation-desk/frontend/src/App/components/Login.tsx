import React from 'react'
import styled from 'styled-components'

import { Body } from 'sharedComponents'
import { context, USER_CONNECTED_ACTION_TYPE } from '../Context'

const Form = styled.form`
`

const Input = styled.input`

`

const Label = styled.label`

`

const Button = styled.button`

`


const Login = () => {
    const [user, setUser] = React.useState<string>('bob')
    const [desk, setDesk] = React.useState<string>('deadbeef')
    const { dispatch } = React.useContext(context)

    return (
        <Body>
            <Label htmlFor="name">Name:</Label>
            <Input name="name" value={user} onChange={event => setUser(event.target.value)} /><br />
            <Label htmlFor="name">Desk:</Label>
            <Input name="desk" value={desk} onChange={event => setDesk(event.target.value)} /><br />
            <Button onClick={() => dispatch({ type: USER_CONNECTED_ACTION_TYPE, user, desk })}>Reserve Desk</Button>
        </Body >
    )
}

export default Login