import { ResolvedEvent } from '@eventstore/db-client'

import TEvent, { EEventName } from '../eventTypes'
import {PaintHistory} from '../../postgres/entity'
import { getRepository } from 'typeorm'

const handleEvent = async (event: ResolvedEvent<TEvent>) => {
    if (!event.event) {
        console.log('Discarding event: ', JSON.stringify(event))
        return
    }

    if (event.event.metadata) {
        console.log(`Discarding metadata event: streamId - ${event.event.streamId} id - ${event.event.id}`)
        return
    }

    switch (event.event.type) {
        case EEventName.TPaintEvent: {
            const paintHistoryRepository = getRepository(PaintHistory)

            const room = event.event.streamId.split("-")[1]
            
            const paintHistoryEvent = new PaintHistory
            paintHistoryEvent.id = event.event.id
            paintHistoryEvent.color = event.event.data[0].color
            paintHistoryEvent.index = event.event.data[0].index
            paintHistoryEvent.room = room
            paintHistoryRepository.save(paintHistoryEvent)
            break;
        }
        case EEventName.DummyEventForTesting: {
            // Remove once there's a second case.
            break
        }
        default: {
            // const _: never = event
            console.log("Unknown Stream passed to handleEvent", JSON.stringify(event))
        }

    }
}

export default handleEvent