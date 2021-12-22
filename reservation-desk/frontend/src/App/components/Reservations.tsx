import * as React from 'react'
import { w3cwebsocket } from "websocket"
import { v4 as uuidv4 } from 'uuid'

import { Body, Title, SubTitle } from 'sharedComponents'
import { ReservationMessage, RESERVATION_MESSAGE_TYPE } from '../../../../types/websockets'
import { context } from '../Context'
import { now } from 'utilities'


const ReservationPicker = ({ handleSubmit }: { handleSubmit: (duration: number) => void }) => {
    const [duration, setDuration] = React.useState<number>(0)

    return (
        <div>
            <label htmlFor='duration'>How many seconds would you like the desk?</label>
            <input name="duration" type="number" min={0} value={duration} onChange={event => setDuration(parseInt(event.target.value, 10))} />
            <button onClick={() => handleSubmit(duration)}>Reserve!</button>
        </div>
    )
}

const Reservations = () => {
    const { state, dispatch } = React.useContext(context)
    const [isDisabled, setIsDisabled] = React.useState<boolean>(false)
    const [timeRemaining, setTimeRemaining] = React.useState<number>(0)

    const handleSubmit = (duration: number) => {
        const secondsSinceEpoch = now()
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

    React.useEffect(() => { // Start countdown after desk has been reserved
        const id = setTimeout(() => {
            const matchingReservation = state.reservations.find(r => r.user === state.user)
            if (matchingReservation && matchingReservation.endTime > now()) {
                setIsDisabled(true)
                setTimeRemaining(matchingReservation.endTime - now())
            }
        }, 1000)
        return () => clearTimeout(id)
    }, [state.reservations.length])

    React.useEffect(() => { // Start countdown after desk has been reserved
        const id = setTimeout(() => {
            if (timeRemaining > 0) {
                setTimeRemaining(timeRemaining - 1)
            } else {
                setIsDisabled(false)
            }
        }, 1000)
        return () => clearTimeout(id)
    }, [timeRemaining])

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
            {isDisabled
                ? `This desk is currently taken by ${state.user}, with ${timeRemaining} time remaining.`
                : <ReservationPicker handleSubmit={handleSubmit} />
            }

        </Body >
    )
}

export default Reservations
