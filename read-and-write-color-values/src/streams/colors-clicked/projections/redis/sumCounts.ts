import { START, FORWARDS } from '@eventstore/db-client';
import { client as eventstoreClient } from '../../../../services/eventstore'

import redis from '../../../../services/redis'
import { STREAM_NAME } from '../../consts'
import { colorCodec } from '../../types'
import { decodeAPIResponse } from '../../../../utilities'

const query = async () => {
    const redisClient = await redis()

    const events = await eventstoreClient.readStream(STREAM_NAME, {
        direction: FORWARDS,
        fromRevision: START
    });

    for await (const resolvedEvent of events) {
        console.log(`Incoming Event ID: ${resolvedEvent?.event?.id}`)
        await decodeAPIResponse({
            codec: colorCodec,
            rawResponse: resolvedEvent?.event?.data,
            onError: () => console.error(`\tBad Event ID: ${resolvedEvent?.event?.id}`),
            onSuccess: async (decodedResponse) => {
                console.log('\tNew ID: ' + decodedResponse.id)
                await redisClient.incr(decodedResponse.color)
                console.log(`\tSuccess count increase ID: ${decodedResponse.id}`)
            }
        })
    }
}

query()