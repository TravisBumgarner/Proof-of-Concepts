import React from 'react'
import styled from 'styled-components'

import { Body } from 'sharedComponents'
import { context } from '../Context'

const Form = styled.form`
`

const Input = styled.input`

`

const Label = styled.label`

`

const Button = styled.button`

`


const Login = () => {
    const [nameInput, setNameInput] = React.useState<string>('bob')
    const [deskInput, setDeskInput] = React.useState<string>('deadbeef')
    const { dispatch } = React.useContext(context)

    return (
        <Body>
            < Form>
                <Label htmlFor="name">Name:</Label>
                <Input name="name" value={nameInput} onChange={event => setNameInput(event.target.value)} /><br />
                <Label htmlFor="name">Desk:</Label>
                <Input name="desk" value={deskInput} onChange={event => setDeskInput(event.target.value)} /><br />
                <Button type='submit'>Reserve Desk</Button>
            </Form>
        </Body>
    )
}

export default Login