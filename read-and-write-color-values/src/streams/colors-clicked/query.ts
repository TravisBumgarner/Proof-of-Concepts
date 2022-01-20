import { START, FORWARDS } from '@eventstore/db-client';
import { client as eventstoreClient } from '../../services/eventstore'
import createConnection from '../../services/postgres';

import { STREAM_NAME } from './consts'
import { colorCodec } from './types'
import { decodeAPIResponse } from '../../utilities'

const query = async () => {
    const dbClient = await createConnection()

    const events = await eventstoreClient.readStream(STREAM_NAME, {
        direction: FORWARDS,
        fromRevision: START
    });

    for await (const resolvedEvent of events) {
        console.log(`Incoming Event ID: ${resolvedEvent?.event?.id}`)
        decodeAPIResponse({
            codec: colorCodec,
            rawResponse: resolvedEvent?.event?.data,
            onError: () => console.error(`\tBad Event ID: ${resolvedEvent?.event?.id}`),
            onSuccess: async (decodedResponse) => {
                console.log(`\tSuccess Event Parsed ID: ${resolvedEvent?.event?.id}`)
                await dbClient.query(`insert into color (id, color, timestamp) values ('${decodedResponse.id}', '${decodedResponse.color}', '${JSON.stringify(decodedResponse.timestamp)}')`)
                console.log(`\tSuccess DB Insert ID: ${resolvedEvent?.event?.id}`)
            }
        })

    }
    await dbClient.close()
}

query()