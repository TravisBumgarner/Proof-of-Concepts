import { START, FORWARDS } from '@eventstore/db-client';
import { client } from '../../eventstore'

import { STREAM_NAME } from './consts'

setInterval(async () => {
    const events = await client.readStream(STREAM_NAME, {
        direction: FORWARDS,
        fromRevision: START
    });

    for await (const resolvedEvent of events) {
        console.log(resolvedEvent.event?.data);
    }
}, 1000)