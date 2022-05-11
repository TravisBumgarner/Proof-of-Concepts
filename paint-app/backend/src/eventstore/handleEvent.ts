import { ResolvedEvent } from '@eventstore/db-client'
import { RedisPubSub } from 'graphql-redis-subscriptions';

import TEvent, { EEventName } from './eventTypes'
import { PaintHistory, Room } from '../postgres/entity'
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
            // Note -> Half the app can only create one pixel per event. But it still sits in an array.
            // const paintHistoryEvents = event.event.data.map(({ pixelIndex, color }, paintEventIndex) => {
            //     const paintHistoryEvent = new PaintHistory
            //     paintHistoryEvent.paintEventIndex = paintEventIndex
            //     paintHistoryEvent.color = color
            //     paintHistoryEvent.commitPosition = event.commitPosition as bigint
            //     paintHistoryEvent.pixelIndex = pixelIndex
            //     paintHistoryEvent.room = room
            //     return paintHistoryEvent
            // })
            const {color, pixelIndex} = event.event.data[0]
            const paintHistoryEvent = new PaintHistory
            paintHistoryEvent.paintEventIndex = 0
            paintHistoryEvent.color = color
            paintHistoryEvent.commitPosition = event.commitPosition as bigint
            paintHistoryEvent.pixelIndex = pixelIndex
            paintHistoryEvent.room = room
            await paintHistoryRepository.save([paintHistoryEvent])

            await pubsub.publish('PAINT_EVENT', {
                paintEvent: [{
                    pixelIndex,
                    color,
                    room
                }]
            });

            break;
        }
        case EEventName.NewRoomEvent: {
            console.log('hi')
            const newRoomRepository = getRepository(Room)
            const {id, title} = event.event.data
            const newRoom = new Room
            newRoom.id = id
            newRoom.title = title

            await newRoomRepository.save(newRoom)

            break
        }
        default: {
            // const _: never = event
            console.log("Unknown Stream passed to handleEvent", JSON.stringify(event))
        }

    }

}

export default handleEvent