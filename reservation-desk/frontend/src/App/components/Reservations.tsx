import * as React from 'react'
import { w3cwebsocket } from "websocket"
import { v4 as uuidv4 } from 'uuid'

import { Body, Title, SubTitle } from 'sharedComponents'
import { ReservationMessage, RESERVATION_MESSAGE_TYPE } from '../../../../types/websockets'
import { context } from '../Context'

const Reservations = () => {
    const { state, dispatch } = React.useContext(context)
    // React.useEffect(() => { // Fake a message from the server saying desk reserved for 5 seconds.
    //     const id = setTimeout(() => setTimeRemaining(5))
    //     return () => clearTimeout(id)
    // }, [reservedName])

    // React.useEffect(() => { // Start countdown after desk has been reserved
    //     const id = setTimeout(() => {
    //         if (timeRemaining > 0) {
    //             setTimeRemaining(timeRemaining - 1)
    //         }
    //     }, 1000)
    //     return () => clearTimeout(id)
    // }, [timeRemaining])

    const handleSubmit = () => {
        const secondsSinceEpoch = Math.round(Date.now() / 1000)
        const duration = 10
        const message = {
            data: {
                startTime: secondsSinceEpoch,
                endTime: secondsSinceEpoch + duration,
                user: state.user,
                id: uuidv4()
            },
            type: RESERVATION_MESSAGE_TYPE,
        } as ReservationMessage

        dispatch(message)
    }

    return (
        <Body>
            <Title>Reservations</Title>
            <SubTitle>Received</SubTitle>
            <ul>
                {state.reservations.map(({ user, startTime, endTime, id }) => {
                    return (
                        <li key={id}>{user} - {startTime} - {endTime}</li>
                    )
                })}
            </ul>
            <button onClick={handleSubmit}>Reserve!</button>

        </Body >
    )
}

export default Reservations
