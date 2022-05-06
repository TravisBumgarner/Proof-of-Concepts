import { ResolvedEvent, EventType} from '@eventstore/db-client'

import { EEventName, EStreamPrefix } from '../eventTypes'

const handleEvent = (event: ResolvedEvent<EventType>) => {
    if(!event.event) {
        console.log('Discarding event: ', JSON.stringify(event))
        return
    }

    if(event.event.metadata){
        console.log(`Discarding metadata event: streamId - ${event.event.streamId} id - ${event.event.id}`)
        return
    }

    const streamPrefix = event.event.streamId.split("-")[0] as EStreamPrefix

    switch (streamPrefix) {
        case EStreamPrefix.Paint: {
            console.log(event.event.data)
            break;
        }
        case EStreamPrefix.NonExistantStream: {
            // Remove once there's a second case.
            break
        }
        default: {
            const _: never = streamPrefix
            console.log("Unknown Stream passed to handleEvent", JSON.stringify(event))
        }

    }
}

export default handleEvent