import { jsonEvent } from '@eventstore/db-client';

import eventstoreClient from './eventstore'
import Event, { EventName } from './eventTypes'


const sendEvent = async (type: EventName, stream: string, data) => {
    const event = jsonEvent<Event>({
        type,
        data,
    });
    await eventstoreClient.appendToStream(stream, event);
}

export default sendEvent