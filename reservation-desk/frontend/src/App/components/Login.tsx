import React from 'react'
import styled from 'styled-components'

import { Body } from 'sharedComponents'

const Form = styled.form`
`

const Input = styled.input`

`

const Label = styled.label`

`

const Button = styled.button`

`

type Props = {
    setUser: React.Dispatch<React.SetStateAction<string>>
}

const Login = ({ setUser }: Props) => {
    const [textInput, setTextInput] = React.useState<string>('')

    return (
        <Body>
            < Form onSubmit={() => setUser(textInput)}>
                <Label htmlFor="name">Name:</Label>
                <Input name="name" value={textInput} onChange={event => setTextInput(event.target.value)} />
                <Button type='submit'>Submit</Button>
            </Form>
        </Body>
    )
}

export default Login