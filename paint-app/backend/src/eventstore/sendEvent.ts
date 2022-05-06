import { jsonEvent } from '@eventstore/db-client';

import eventstoreClient from './eventstore'
import TEvent, { EEventName } from './eventTypes'


const sendEvent = async (type: EEventName, stream: string, data) => {
    const event = jsonEvent<TEvent>({
        type,
        data,
    });
    await eventstoreClient.appendToStream(stream, event);
}

export default sendEvent