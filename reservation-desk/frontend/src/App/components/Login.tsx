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
    const [textInput, setTextInput] = React.useState<string>('')
    const { dispatch } = React.useContext(context)

    return (
        <Body>
            < Form onSubmit={() => dispatch({ user: textInput, type: "USER_LOGGED_IN" })}>
                <Label htmlFor="name">Name:</Label>
                <Input name="name" value={textInput} onChange={event => setTextInput(event.target.value)} />
                <Button type='submit'>Submit</Button>
            </Form>
        </Body>
    )
}

export default Login