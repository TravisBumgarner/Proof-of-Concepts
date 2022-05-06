import { jsonEvent } from '@eventstore/db-client';

import { client } from '.'
import TEvent, { EEventName } from './eventTypes'


const sendEvent = async (type: EEventName, stream: string, data) => {
    const event = jsonEvent<TEvent>({
        type,
        data,
    });
    await client.appendToStream(stream, event);
}

export default sendEvent