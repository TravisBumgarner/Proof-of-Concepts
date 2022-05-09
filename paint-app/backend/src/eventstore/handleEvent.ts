import { ResolvedEvent } from '@eventstore/db-client'
import { RedisPubSub } from 'graphql-redis-subscriptions';

import TEvent, { EEventName } from './eventTypes'
import { PaintHistory } from '../postgres/entity'
import { getRepository } from 'typeorm'

const pubsub = new RedisPubSub();

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
            const paintHistoryEvents = event.event.data.map(({ pixelIndex, color }, paintEventIndex) => {
                const paintHistoryEvent = new PaintHistory
                paintHistoryEvent.paintEventIndex = paintEventIndex
                paintHistoryEvent.color = color
                paintHistoryEvent.commitPosition = event.commitPosition as bigint
                paintHistoryEvent.pixelIndex = pixelIndex
                paintHistoryEvent.room = room
                return paintHistoryEvent
            })
            await paintHistoryRepository.save(paintHistoryEvents)
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