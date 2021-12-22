import * as React from 'react'
import styled from 'styled-components'

import { Body, Title } from 'sharedComponents'

const Form = styled.form`
`

const Input = styled.input`

`

const Label = styled.label`

`

const Button = styled.button`

`

const App = () => {
  const [inputName, setInputName] = React.useState<string>('')
  const [reservedName, setReservedName] = React.useState<string>('')
  const [timeRemaining, setTimeRemaining] = React.useState<number>(0)

  React.useEffect(() => { // Fake a message from the server saying desk reserved for 5 seconds.
    const id = setTimeout(() => setTimeRemaining(5))
    return () => clearTimeout(id)
  }, [reservedName])

  React.useEffect(() => { // Start countdown after desk has been reserved
    const id = setTimeout(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1)
      }
    }, 1000)
    return () => clearTimeout(id)
  }, [timeRemaining])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setReservedName(inputName)
    setInputName('')
  }

  return (
    <Body>
      <div>
        <Title>Config</Title>
        {/* <Button onClick={() => setCanSubmit(!canSubmit)}>Toggle Submit</Button> */}
        <Title>Reservation System</Title>
        {
          timeRemaining
            ?
            (<div>
              <p>Currently reserved by: {reservedName}</p>
              <p>Please wait {timeRemaining}s to reserve this station.</p>
            </div>
            )
            : (
              < Form onSubmit={handleSubmit}>
                <Label htmlFor="name">Name:</Label>
                <Input name="name" value={inputName} onChange={event => setInputName(event.target.value)} />
                <Button type='submit'>Submit</Button>
              </Form>
            )
        }
      </div>
    </Body >
  )
}

export default App
