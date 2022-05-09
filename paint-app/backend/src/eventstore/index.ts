import { EventStoreDBClient, ResolvedEvent, SubscribeToAllOptions } from '@eventstore/db-client'
import { getConnection, getRepository } from 'typeorm'

import ormconfig from '../postgres/ormconfig'
import entity from '../postgres'
import handleEvent from './handleEvent'

const client = new EventStoreDBClient({ endpoint: 'localhost:2113' }, { insecure: true })

type AllStreamEventHandler = (e: ResolvedEvent) => void
const connectHandlerToAllStreamEvents = async (options: SubscribeToAllOptions, handler: AllStreamEventHandler) => {
    client.subscribeToAll(options).on('data', handler)
}

BigInt.prototype["toJSON"] = function () {
    return this.toString();
};

const getOffsetForStream = async (stream: string): Promise<bigint | null> => {
    const postgresConnection = await getConnection()

    const result = await postgresConnection
        .getRepository(entity.ProjectionOffset)
        .createQueryBuilder('projection_offset')
        .select("MAX(projection_offset.offset)", 'offset')
        .groupBy('stream')
        .andWhere('projection_offset.stream = :stream', { stream })
        .getRawOne<{ offset: bigint }>()

    return result && result.offset
        ? result.offset
        : null
}

const allStreamsHandler = async () => {
    const offset = await getOffsetForStream('all')
    const options: SubscribeToAllOptions = offset
        ? {
            fromPosition: {
                commit: offset,
                prepare: offset
            }
        }
        : {
            fromPosition: 'start'
        }

    console.log(`Starting stream all at with options ${JSON.stringify(options)}`)

    connectHandlerToAllStreamEvents(options, async event => {
        if (event.commitPosition) {
            const projectionRepository = getRepository(entity.ProjectionOffset)

            const projectionOffset = new entity.ProjectionOffset
            projectionOffset.offset = event.commitPosition
            projectionOffset.stream = "all"
            projectionRepository.save(projectionOffset)

            try {
                await handleEvent(event)
            } catch (error) {
                console.log(`
                    Garbage event in stream ${event.event?.streamId}
                    Data ${JSON.stringify(event.event?.data)}
                    Error: ${JSON.stringify(error.message)}      
                `)
            }


        } else {
            console.log(`Event does not have offset for stream all`)
        }
    })
}

export {
    client,
    allStreamsHandler
}